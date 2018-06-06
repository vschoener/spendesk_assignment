// @flow
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import type { $Application } from 'express';
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

    // TODO: Use an error Handler middleware

    // Body parser
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));

    // Cors
    this.expressApp.use(cors());

    // Logging
    this.expressApp.use(morgan('combined', { stream: logger.stream }));

    this.expressApp.use(passport.initialize());
    
    // Attach app routes
    this.expressApp.use(router);


    // Api docs
    this.expressApp.use('/apidoc', express.static('apidoc'));
  }

  async prepareMongoDb(): Promise<void> {
    await this.mongoDb.connect();
  }

  async start(): Promise<void> {
    await this.prepareMongoDb();
    this.server = await this.expressApp.listen(this.config.api.port);
    logger.log('info', `✔ Server running on port ${this.config.api.port}`);
  }

  getExpressApp(): $Application {
    return this.expressApp;
  }
}

export default App;
