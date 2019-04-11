import * as express from 'express';

export function formatMiddleware(data: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  next({
    success: true,
    ...data
  });
}