import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { SymptomTypeModel } from '../models/symptom-type.model';

export class DeleteSymptomTypeRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/delete-symptom-type';
  }

  public async routeFunction(params, db: Connection) {
    if (params.id === null)
      throw 'Missing id parameter';
      
    const id = params.id;

    const symptomTypes = db.getRepository(SymptomTypeModel);
    
    const symptomType: SymptomTypeModel = await symptomTypes.findOne({
      id: id
    });

    console.log(symptomType);

    if (!symptomType) {
      throw 'A symptom type with that id does not exist';
    }

    await symptomTypes.delete(symptomType);

    return true;
  }
}