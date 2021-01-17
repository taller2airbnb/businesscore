const winston = require('winston');
const moment = require('moment');

module.exports.logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {timestamp: moment().format('DD/MM/YYYY, h:mm:ss') },
  transports: [
    new winston.transports.File({ filename: './src/logs/bussines-core-error.log', level: 'error'}),
    new winston.transports.File({ filename: './src/logs/bussines-core-info.log' })
  ],
});