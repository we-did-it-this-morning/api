import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { CountryModel } from '../models/country.model';
export class CountryRoute extends Route {
  getMethod() {
    return HttpMethod.GET;
  }
  endpointName() {
    return '/country';
  }
  async routeFunction(params, db: Connection) {
    if (!params.id) {
      throw 'Id not supplied';
    }

    const country = await db.getRepository(CountryModel).findOne({
      id: params.id
    });

    console.log(country);

    if (!country) {
      throw 'A country with that id does not exist.';
    }

    return country;
  }
}