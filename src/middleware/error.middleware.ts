import * as express from 'express';

export function errorMiddleware(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err) {
    console.error(err);
    res.status(500).json({
      ...err,
      success: false,
    });
  }
}