import winston from 'winston';

const logLevels = {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'cyan',
  };


  
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const color = logLevels[level] || 'white';
      return winston.format.colorize({ all: true }).colorize(level, `[${timestamp}] [${level.toUpperCase()}]: ${message}`);
    })
  );


  export const developmentLogger = winston.createLogger({
    level: 'debug',
    format: logFormat,
    transports: [
      new winston.transports.Console(),
    ],
  });

  export const productionLogger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ],
  });


