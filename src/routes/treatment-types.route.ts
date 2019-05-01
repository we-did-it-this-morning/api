import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { TreatmentTypeModel } from '../models/treatment-type.model';

export class TreatmentTypesRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }

  public endpointName() {
    return '/treatment-types';
  }

  public async routeFunction(params, db: Connection) {
    return await db.getRepository(TreatmentTypeModel).find();
  }
}