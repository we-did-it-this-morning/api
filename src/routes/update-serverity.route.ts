import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { SeverityModel } from '../models/severity.model';

export class UpdateSeverityRoute extends Route {
  getMethod() {
    return HttpMethod.POST;
  }
  endpointName() {
    return '/update-severity';
  }
  async routeFunction(params, db: Connection) {
    if (!params.level || !params.description) {
      throw 'Parameters not supplied';
    }

    const severities = db.getRepository(SeverityModel);

    let severity = await severities.findOne({
      level: params.level
    });

    if (!severity) {
      severity = new SeverityModel();
      severity.level = params.level;
    }

    severity.description = params.description;

    await severities.save(severity);
    return severity;
  }
}