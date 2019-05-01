import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { PreventionModel } from '../models/prevention.model';
export class PreventionsRoute extends Route {
  getMethod() {
    return HttpMethod.GET;
  }
  endpointName() {
    return '/preventions';
  }
  async routeFunction(params, db: Connection) {
    return await db.getRepository(PreventionModel).find({
      loadRelationIds: true,
    });
  }
}