import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { CountryModel } from '../models/country.model';
import { MalariaTypeModel } from '../models/malaria-type.model';


export class UpdateCountryRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }
  public endpointName() {
    return '/update-country';
  }
  public async routeFunction(params, db: Connection) {
    if (!params.name || !params.malariaTypes) {
      throw 'Name or malariaTypes not supplied';
    }

    const countries = db.getRepository(CountryModel);
    const malariaTypes = db.getRepository(MalariaTypeModel);

    console.log('id', params.id);

    let country: CountryModel;
    if (!params.id) {
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
    country.malariaTypes = await malariaTypes.findByIds(params.malariaTypes);

    try {
      await countries.save(country);
    } catch (err) {
      console.error(err);
      throw err;
    }

    return country;
  }
}