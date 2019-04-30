import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { MalariaTypeModel } from '../models/malaria-type.model';

export class DeleteMalariaTypeRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/delete-malaria-type';
  }

  public async routeFunction(params, db: Connection) {
    if (!params.id)
      throw 'Missing id parameter';
      
    const id = params.id;

    const malariaTypes = db.getRepository(MalariaTypeModel);
    
    const malariaType: MalariaTypeModel = await malariaTypes.findOne({
      id: id
    });

    console.log(malariaType);

    if (!malariaType) {
      throw 'A malaria type with that id does not exist';
    }

    await malariaTypes.delete(malariaType);

    return true;
  }
}