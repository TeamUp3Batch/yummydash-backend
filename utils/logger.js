const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set the logging level (info, error, debug, etc.)
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'}),
  ],
});

module.exports = logger;
