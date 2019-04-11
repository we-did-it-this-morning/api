import { Database } from './database';
import { Connection } from 'typeorm';
import * as express from 'express';

export abstract class Route {
  public abstract getMethod(): HttpMethod;
  public abstract endpointName(): string;
  public abstract async routeFunction(params: {[name: string]: any}, db: Connection): Promise<any>;

  private route = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(req.query, req.body);
    const params = {
      ...req.query,
      ...req.body
    };

    try {
      res.json(await this.routeFunction(params, await Database.get()));
    } catch (e) {
      next(e);
    }
  }

  public register(app: express.Application, middleware = []) {
    const registerFn = this.getMethod() == HttpMethod.GET ? app.get : app.post;
    registerFn.call(app, this.endpointName(), middleware, this.route);
  }
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
}