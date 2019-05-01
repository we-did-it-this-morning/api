import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { TreatmentTypeModel } from '../models/treatment-type.model';

export class DeleteTreatmentTypeRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/delete-treatment-type';
  }

  public async routeFunction(params, db: Connection) {
    if (params.id === null)
      throw 'Missing id parameter';
      
    const id = params.id;

    const treatmentTypes = db.getRepository(TreatmentTypeModel);
    
    const treatmentType: TreatmentTypeModel = await treatmentTypes.findOne({
      id: id
    });

    console.log(treatmentType);

    if (!treatmentType) {
      throw 'A treatment type with that id does not exist';
    }

    await treatmentTypes.delete(treatmentType);

    return true;
  }
}