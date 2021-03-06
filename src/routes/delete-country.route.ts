import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { CountryModel } from '../models/country.model';
export class DeleteCountryRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }
  public endpointName() {
    return '/delete-country';
  }
  public async routeFunction(params, db: Connection) {
    if (!params.id) {
      throw 'Id not supplied';
    }

    const country = await db.getRepository(CountryModel).findOne({
      id: params.id
    });

    if (!country) {
      throw 'A country with that id does not exist.';
    }

    await db.getRepository(CountryModel).delete(country);

    return true;
  }
}