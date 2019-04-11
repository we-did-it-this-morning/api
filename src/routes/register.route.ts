import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';

export class RegisterRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/register';
  }

  public async routeFunction(params, db) {
    return {
      ...params,
      message: 'Register route'
    };
  }
}