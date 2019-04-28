import { RegisterRoute } from './../routes/register.route';
import { LoginRoute } from './../routes/login.route';
import { HomeRoute } from '../routes/home.route';
import { SymptomRoute } from '../routes/symptom.route';
import { UpdateSymptomRoute } from '../routes/update-symptom.route';
import { UpdateSymptomTypeRoute } from '../routes/update-symptom-type.route';
import { SymptomTypeRoute } from '../routes/symptom-type.route';
import { SymptomTypesRoute } from '../routes/symptom-types.route';
import { SymptomsRoute } from '../routes/symptoms.route';
import { TreatmentRoute } from '../routes/treatment.route';
import { TreatmentTypeRoute } from '../routes/treatment-type.route';
import { TreatmentsRoute } from '../routes/treatments.route';
import { TreatmentTypesRoute } from '../routes/treatment-types.route';
import { UpdateTreatmentRoute } from '../routes/update-treatment.route';
import { UpdateTreatmentTypeRoute } from '../routes/update-treatment-type.route';

import { authMiddleware } from './../middleware/auth.middleware';
import * as express from 'express';
import * as http from 'http';
import { errorMiddleware } from '../middleware/error.middleware';
import { formatMiddleware } from '../middleware/format.middleware';
import { SeveritiesRoute } from '../routes/severities.route';
import { UpdateSeverityRoute } from '../routes/update-serverity.route';
import { PreventionRoute } from '../routes/prevention.route';
import { UpdatePreventionRoute } from '../routes/update-prevention.route';
import { SeverityRoute } from '../routes/severity.route';
import { PreventionsRoute } from '../routes/preventions.route';
import { CountryRoute } from '../routes/country.route';
import { CountriesRoute } from '../routes/countries.route';
import { UpdateCountryRoute } from '../routes/update-country.route';
import { MalariaTypesRoute } from '../routes/malaria-types.route';
import { UpdateMalariaTypeRoute } from '../routes/update-malaria-type.route';

export class Server {
  protected static instance: Server = null;

  public static getInstance(): Server {
    if (Server.instance === null) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  protected app: express.Application;
  protected server: http.Server;

  private constructor() {}

  public start(port) {
    this.app = express();

    this.app.use(express.json());

    // register non auth routes
    [
      new LoginRoute(),
      new RegisterRoute(),
      
      new SymptomRoute(),
      new SymptomsRoute(),
      new UpdateSymptomRoute(),
      new UpdateSymptomTypeRoute(),      
      new SymptomTypeRoute(),
      new SymptomTypesRoute(),

      new TreatmentRoute(),
      new TreatmentTypeRoute(),
      new UpdateTreatmentRoute(),
      new UpdateTreatmentTypeRoute(),
      new TreatmentsRoute(),
      new TreatmentTypesRoute(),

      new SeverityRoute(),
      new SeveritiesRoute(),
      new UpdateSeverityRoute(),

      new PreventionRoute(),
      new PreventionsRoute(),
      new UpdatePreventionRoute(),

      new CountryRoute(),
      new CountriesRoute(),
      new UpdateCountryRoute(),

      new MalariaTypesRoute(),
      new UpdateMalariaTypeRoute(),
    ].forEach(route => route.register(this.app));

    // register auth routes
    [
      new HomeRoute()
    ].forEach(route => route.register(this.app, [authMiddleware]));

    this.app.use(formatMiddleware);
    this.app.use(errorMiddleware);

    return new Promise(resolve => {
      this.server = this.app.listen(port, resolve);
    });
  }

}