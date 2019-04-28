import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { CountryModel } from '../models/country.model';
export class CountriesRoute extends Route {
  public getMethod() {
    return HttpMethod.GET;
  }
  public endpointName() {
    return '/countries';
  }
  public async routeFunction(params, db: Connection) {
   return await db.getRepository(CountryModel).find();
  }
}