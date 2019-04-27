import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { CountryModel } from '../models/country.model';
export class UpdateCountryRoute extends Route {
  getMethod() {
    return HttpMethod.POST;
  }
  endpointName() {
    return '/update-country';
  }
  async routeFunction(params, db: Connection) {
    if (!params.name) {
      throw 'Name not supplied';
    }

    const countries = db.getRepository(CountryModel);

    console.log('id', params.id);

    let country: CountryModel;
    if (!!params.id) {
      country = await countries.findOne({
        id: params.id
      });

      if (!country) {
        throw 'A country with that id does not exist';
      }
    }
    else {
      country = new CountryModel();
    }

    country.name = params.name;

    try {
      await countries.save(country);
    } catch (err) {
      console.error(err);
      throw err;
    }

    return country;
  }
}