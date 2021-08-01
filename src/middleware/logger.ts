import { Request, Response } from 'express';
import { logger } from '../common/logger';

const loggerMiddleware = (req: Request, resp: Response, next) => {
  logger.info(`Request logged: ${req.method} - ${req.path}`)
  next();
};

export default loggerMiddleware;
