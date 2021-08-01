import { Request, Response } from 'express';
import { isDebugEnv } from '../common/environment';

const corsMiddleware = (req: Request, resp: Response, next) => {
  if (isDebugEnv()) {
    resp.header('Access-Control-Allow-Origin', '*'); // Only for dev
  }
  next();
};

export default corsMiddleware;
