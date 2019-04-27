import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { CountryModel } from '../models/country.model';
export class CountriesRoute extends Route {
  getMethod() {
    return HttpMethod.GET;
  }
  endpointName() {
    return '/countries';
  }
  async routeFunction(params, db: Connection) {
   return await db.getRepository(CountryModel).find();
  }
}