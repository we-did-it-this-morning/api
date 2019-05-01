import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { SeverityModel } from '../models/severity.model';

export class SeveritiesRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }
  public endpointName() {
    return '/severities';
  }
  public async routeFunction(params, db: Connection) {
   return await db.getRepository(SeverityModel).find({
     loadRelationIds: true,
   });
  }
}