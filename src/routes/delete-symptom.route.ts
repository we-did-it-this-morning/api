import { Connection } from 'typeorm';
import { HttpMethod } from './../classes/route';
import { Route } from './../classes/route';
import { SymptomModel } from './../models/symptom.model';

export class DeleteSymptomRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/delete-symptom';
  }

  public async routeFunction(params, db: Connection) {
    if (!params.id)
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

    await symptoms.delete(symptom);

    return true;
  }
}