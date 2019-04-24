import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { TreatmentModel } from '../models/treatment.model';

export class TreatmentsRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }

  public endpointName() {
    return '/treatments';
  }

  public async routeFunction(params, db: Connection) {
    return await db.getRepository(TreatmentModel).find();
  }
}