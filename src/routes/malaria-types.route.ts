import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { MalariaTypeModel } from '../models/malaria-type.model';
export class MalariaTypesRoute extends Route {
  getMethod() {
    return HttpMethod.GET;
  }
  endpointName() {
    return '/malaria-types';
  }
  public async routeFunction(params, db: Connection) {
   return await db.getRepository(MalariaTypeModel).find();
  }
}