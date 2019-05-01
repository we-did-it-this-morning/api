import { Connection } from 'typeorm';
import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';
import { SymptomModel } from '../models/symptom.model';

export class SymptomsRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }

  public endpointName() {
    return '/symptoms';
  }

  public async routeFunction(params, db: Connection) {
    return await db.getRepository(SymptomModel).find({ loadRelationIds: true });
  }
}