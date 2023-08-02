import { developmentLogger, productionLogger } from "../../shared/logger.js";

export const addLogger = (req, res, next) => {
    const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} `);
    next();
  };
