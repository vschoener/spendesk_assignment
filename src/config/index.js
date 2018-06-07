// @flow
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export type MongoConfig = {
  name: string;
  url: string;
}

export type ApiServerConfig = {
  port: string;
}

export type AppConfig = {
  api: ApiServerConfig;
  mongodb: MongoConfig;
  env: string;
}

//  About new Buffer deprecated in Node 10:
// https://nodesource.com/blog/understanding-the-buffer-deprecation-in-node-js-10/
const appConfig: AppConfig = {
  api: {
    port: process.env.PORT || '8000',
  },
  mongodb: {
    name: 'loyalty',
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/temp',
    // No need to set SSL for the test
  },
  env: process.env.ENV || 'dev',
};

export default appConfig;

