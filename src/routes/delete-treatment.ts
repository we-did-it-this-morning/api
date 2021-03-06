import { Connection } from 'typeorm';
import { HttpMethod } from './../classes/route';
import { Route } from './../classes/route';
import { TreatmentModel } from './../models/treatment.model';

export class DeleteTreatmentRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/delete-treatment';
  }

  public async routeFunction(params, db: Connection) {
    if (!params.id)
      throw 'Missing id parameter';
      
    const id = params.id;

    const treatments = db.getRepository(TreatmentModel);
    
    const treatment: TreatmentModel = await treatments.findOne({
      id: id
    });

    console.log(treatment);

    if (!treatment) {
      throw 'A treatment with that id does not exist';
    }

    await treatments.delete(treatment);

    return true;
  }
}