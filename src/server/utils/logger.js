import winston from 'winston';
import { config } from '../../shared/env';

export default new (winston.Logger)({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: config.loglevel || 'warn',
      colorize: true,
    }),
  ],
});
