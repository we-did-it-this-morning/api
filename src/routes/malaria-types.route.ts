import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { MalariaTypeModel } from '../models/malaria-type.model';
export class MalariaTypesRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }
  public endpointName() {
    return '/malaria-types';
  }
  public async routeFunction(params, db: Connection) {
   return await db.getRepository(MalariaTypeModel).find();
  }
}