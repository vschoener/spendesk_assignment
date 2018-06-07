// @flow

/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^next$" }] */
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import type { $Application, $Request, $Response } from 'express';
import errorHandler from 'errorhandler';
import type { AppConfig } from './config/';
import router from './api';
import logger from './logger';
import MongoDB from './mongodb';
import passport from './api/passport';

/**
 * In Node App, I always see everything in app.js without a class / object aspect but I feel it could be improve
 * that way if it's not overkill
 */
class App {
  expressApp: $Application;
  config: AppConfig;
  server: any;
  mongoDb: MongoDB;

  constructor(
    expressApp: $Application,
    config: AppConfig,
  ) {
    this.expressApp = expressApp;
    this.config = config;
  }

  init() {
    this.initializeExpress();
    this.mongoDb = new MongoDB(this.config.mongodb);
  }

  // Should be private method
  initializeExpress() {
    // Attach basics Middleware

    if (this.config.env === 'dev') {
      this.expressApp.use(errorHandler());
    }

    // Body parser
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));

    // Cors
    this.expressApp.use(cors());

    // Logging
    this.expressApp.use(morgan('combined', { stream: logger.stream }));

    this.expressApp.use(passport.initialize());

    // Api docs
    this.expressApp.use('/apidoc', express.static('apidoc'));

    // Attach app routes
    this.expressApp.use(router);

    this.attachRoutingIssueMiddleware();
  }

  /**
   * Handle any problem with routes
   * @returns {App}
   */
  attachRoutingIssueMiddleware(): App {
    // TODO: Idea, we could improve this using custom Error object and manage each type here
    this.expressApp.use((req: $Request, res: $Response) => {
      const error = new Error('Resource not found');
      res.status(404);
      return this.responseError(res, error);
    });

    this.expressApp.use((error: Error, req: $Request, res: $Response, next: any) => {
      res.status(500);
      return this.responseError(res, error);
    });

    return this;
  }

  /**
   * @param {e.Response} res
   * @param {Error} error
   * @returns {e.Response}
   */
  responseError(res: $Response, error: Error): $Response {
    const result: Object = {
      message: error.message,
    };

    if (['dev', 'test'].indexOf(this.config.env) >= 0) {
      logger.log('error', error.message);
      logger.log('error', error.stack);
      result.stack = error.stack;
    }

    return res.json(result);
  }

  async prepareMongoDb(): Promise<void> {
    await this.mongoDb.connect();
  }

  async start(): Promise<$Application> {
    await this.prepareMongoDb();
    this.server = await this.expressApp.listen(this.config.api.port);
    logger.log('info', `✔ Server running on port ${this.config.api.port}`);

    return this.expressApp;
  }

  async stop(): Promise<void> {
    return this.expressApp.stop();
  }

  getExpressApp(): $Application {
    return this.expressApp;
  }
}

export default App;
