import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { SeverityModel } from '../models/severity.model';
import { MalariaTypeModel } from '../models/malaria-type.model';

export class DeleteSeverityRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }
  public endpointName() {
    return '/delete-severity';
  }
  public async routeFunction(params, db: Connection) {
    if (!params.level) {
      throw 'Level not supplied';
    }

    const severity = await db.getRepository(SeverityModel).findOne({
      where: {
        level: params.level,
      },
      loadRelationIds: true,
    });

    if (!severity) {
      throw 'A severity with that id does not exist';
    }

    const check = db.getRepository(MalariaTypeModel).find({
      loadRelationIds: true,
      where: {
        severity: severity.level
      }
    });

    if (check) {
      throw 'A malaria type still references this severity';
    }

    await db.getRepository(SeverityModel).delete(severity);

    return true;
  }
}