import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { PreventionModel } from '../models/prevention.model';
export class PreventionRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }
  public endpointName() {
    return '/prevention';
  }
  public async routeFunction(params, db: Connection) {
    if (!params.id) {
      throw 'Id not supplied';
    }
    const prevention = await db.getRepository(PreventionModel).findOne({
      where: {
        id: params.id
      },
      loadRelationIds: true,
    });

    if (!prevention) {
      throw 'A prevention with that id does not exist.';
    }

    console.log(prevention, prevention.severities);
    
    return true;
  }
}