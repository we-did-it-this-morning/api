import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { SeverityModel } from '../models/severity.model';

export class SeveritiesRoute extends Route {
  getMethod() {
    return HttpMethod.GET;
  }
  endpointName() {
    return '/severities';
  }
  async routeFunction(params, db: Connection) {
   return await db.getRepository(SeverityModel).find({
     loadRelationIds: true,
   });
  }
}