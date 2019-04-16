import { Connection } from 'typeorm';
import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';
import { SymptomModel } from '../models/symptom.model';

export class SymptomRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }

  public endpointName() {
    return '/symptom';
  }

  public async routeFunction(params, db: Connection) {
    if (params.id === null)
      throw 'Missing id parameter';
      
    const id = params.id;

    const symptoms = db.getRepository(SymptomModel);
    
    const symptom: SymptomModel = await symptoms.findOne({
      id: id
    });

    console.log(symptom);

    if (!symptom) {
      throw 'A symptom with that id does not exist';
    }

    return symptom;
  }
}