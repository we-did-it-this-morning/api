import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { PreventionModel } from '../models/prevention.model';
import { SeverityModel } from '../models/severity.model';
export class UpdatePreventionRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }
  public endpointName() {
    return '/update-prevention';
  }
  public async routeFunction(params, db: Connection) {
    console.log(params);
    if (!params.name || !params.description || !params.severities) {
      throw 'Missing parameters';
    }

    const preventions = db.getRepository(PreventionModel);
    const severities = db.getRepository(SeverityModel);

    if (!params.id) {
      const prevention = new PreventionModel();
      prevention.name = params.name;
      prevention.description = params.description;
      prevention.severities = await severities.findByIds(params.severities);
      
      await preventions.save(prevention);
      return prevention;
    }

    console.log('updating');

    const prevention = await preventions.findOne({
      id: params.id
    });

    console.log(prevention);

    if (!prevention) {
      throw 'A prevention with that id does not exist.';
    }

    prevention.name = params.name;
    prevention.description = params.description;
    prevention.severities = await severities.findByIds(params.severities);

    try {
      await preventions.save(prevention);
    } catch (e) {
      console.error(e);
    }

    console.log('saved prevention');
    return prevention;
  }
}