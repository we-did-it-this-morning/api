import * as express from 'express';

export function formatMiddleware(data: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  let response: any = {
    success: true,
  };

  if (typeof data === 'string') {
    response.message = data;
  }
  else {
    response = {
      ...response,
      ...data
    };
  }

  next(response);
}