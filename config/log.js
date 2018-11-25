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
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

let transports = [];
  transports.push(
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',  //file name with date
      datePattern: 'YYYY-MM-DD-HH-mm',  // every 1 min logging
      //zippedArchive: true, //convert to gzip older logs but has a bug . Could not delete
      maxSize: '1m', //size 1 MB max
      maxFiles: '5' // Max 5 files
    })
  ); 
  
  var logger = winston.createLogger({
    level:(process.env.NODE_ENV === 'production')?'info':'debug',
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.json()
    ), 
    transports: transports 
  });

  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));

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
  custom : logger,
  //level: logger.level
  intercept : true

};
