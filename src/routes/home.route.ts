import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';

export class HomeRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }

  public endpointName() {
    return '/';
  }

  public async routeFunction(params, db) {
    return {
      message: 'Hello, there'
    };
  }
}