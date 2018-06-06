// @flow
import appRoot from 'app-root-path';
import winston from 'winston';
import fs from 'fs';

const dirLogs = `${appRoot}/logs`;

// It's call during initialization, we can block the thread
if (!fs.existsSync(dirLogs)) {
  fs.mkdirSync(dirLogs);
}
// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${dirLogs}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// Keep it simple to focus on the need first
// I think Logger should send logs to a logger service
const logger = new (winston.Logger)({
  level: 'info',
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export default logger;
