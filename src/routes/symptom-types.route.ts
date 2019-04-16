import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { SymptomTypeModel } from '../models/symptom-type.model';

export class SymptomTypesRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }

  public endpointName() {
    return '/symptom-types';
  }

  public async routeFunction(params, db: Connection) {
    const symptomTypes = db.getRepository(SymptomTypeModel);
    
    const symptomTypesList: SymptomTypeModel[] = await symptomTypes.find();
    
    return symptomTypesList;
  }
}