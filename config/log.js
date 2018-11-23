/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */
var winston = require('winston');
//let customLogger;

function customTimestamp() {
  var wholedate, time, date;
  wholedate = new Date();
  time = wholedate.toLocaleTimeString();
  date = wholedate.toLocaleDateString();
  wholedate = date + ' ' + time;
  return wholedate;
}


if (process.env.NODE_ENV === 'development') {
  var customLogger = winston.createLogger({
    timestamp: function () {
      return customTimestamp();
    },
    level:'silly',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.colorize({ all: true }),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: 'logs/warn.log',
        level: 'warn'
      }),
      new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info'
      }),
      new winston.transports.File({
        filename: 'logs/verbose.log',
        level: 'verbose'
      }),
      new winston.transports.File({
        filename: 'logs/debug.log',
        level: 'debug'
      }),
      new winston.transports.File({
        filename: 'logs/silly.log',
        level: 'silly'
      }),
    ]
  });
  //If we're not in production then log to the `console` with the format:
  //`${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  customLogger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

if (process.env.NODE_ENV === 'production') {
  var customLogger = winston.createLogger({
    timestamp: function () {
      return customTimestamp();
    },
    level:'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.colorize({ all: true }),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: 'logs/warn.log',
        level: 'warn'
      }),
      new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info'
      }),
    ]
  });
  customLogger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  // level: 'info'

  // Pass in our custom logger, and pass all log levels through.
  custom: customLogger,
  //level: 'info',

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false

};
