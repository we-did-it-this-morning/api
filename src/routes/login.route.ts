import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';

export class LoginRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/log-in';
  }

  public async routeFunction(params, db) {
    return {
      message: 'Login route'
    };
  }
}