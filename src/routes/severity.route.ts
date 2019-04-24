import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { SeverityModel } from '../models/severity.model';

export class SeverityRoute extends Route {
  getMethod() {
    return HttpMethod.GET;
  }
  endpointName() {
    return '/severity';
  }
  async routeFunction(params, db: Connection) {
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

    return severity;
  }
}