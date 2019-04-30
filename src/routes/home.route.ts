import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';
const fs = require('fs');

export class HomeRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }

  public endpointName() {
    return '/';
  }

  public async routeFunction(params, db) {
    let html = fs.readFileSync('../views/index.html');
    return html;
  }
}