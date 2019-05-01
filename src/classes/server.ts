import { RegisterRoute } from './../routes/register.route';
import { LoginRoute } from './../routes/login.route';
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
import { SeveritiesRoute } from '../routes/severities.route';
import { UpdateSeverityRoute } from '../routes/update-serverity.route';
import { PreventionRoute } from '../routes/prevention.route';
import { UpdatePreventionRoute } from '../routes/update-prevention.route';
import { SeverityRoute } from '../routes/severity.route';
import { PreventionsRoute } from '../routes/preventions.route';
import { CountryRoute } from '../routes/country.route';
import { CountriesRoute } from '../routes/countries.route';
import { UpdateCountryRoute } from '../routes/update-country.route';
import { MalariaTypeRoute } from '../routes/malaria-type.route';
import { MalariaTypesRoute } from '../routes/malaria-types.route';
import { UpdateMalariaTypeRoute } from '../routes/update-malaria-type.route';
import { UpdatePasswordRoute } from '../routes/update-password.route';
import { DeleteSymptomRoute } from '../routes/delete-symptom.route';
import { DeleteSymptomTypeRoute } from '../routes/delete-symptom-type.route';
import { DeleteTreatmentRoute } from '../routes/delete-treatment';
import { DeleteTreatmentTypeRoute } from '../routes/delete-treatment-type.route';
import { DeleteSeverityRoute } from '../routes/delete-severity.route';
import { DeletePreventionRoute } from '../routes/delete-prevention.route';
import { DeleteCountryRoute } from '../routes/delete-country.route';
import { DeleteMalariaTypeRoute } from '../routes/delete-malaria-type.route';

import * as path from 'path';

import * as cors from 'cors';

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

    this.app.use(cors());

    this.app.use(express.json());

    // register non auth routes
    [
      new LoginRoute(),
      
      new SymptomRoute(),
      new SymptomsRoute(),
      new SymptomTypeRoute(),
      new SymptomTypesRoute(),

      new TreatmentRoute(),
      new TreatmentTypeRoute(),
      new TreatmentsRoute(),
      new TreatmentTypesRoute(),

      new SeverityRoute(),
      new SeveritiesRoute(),

      new PreventionRoute(),
      new PreventionsRoute(),

      new CountryRoute(),
      new CountriesRoute(),

      new MalariaTypeRoute(),
      new MalariaTypesRoute(),
      
    ].forEach(route => route.register(this.app));

    // register auth routes
    [
      new RegisterRoute(),
      new UpdatePasswordRoute(),

      new UpdateSymptomRoute(),
      new DeleteSymptomRoute(),
      new UpdateSymptomTypeRoute(),
      new DeleteSymptomTypeRoute(),

      new UpdateTreatmentRoute(),
      new DeleteTreatmentRoute(),
      new UpdateTreatmentTypeRoute(),
      new DeleteTreatmentTypeRoute(),

      new UpdateSeverityRoute(),
      new DeleteSeverityRoute(),

      new UpdatePreventionRoute(),
      new DeletePreventionRoute(),
      
      new UpdateCountryRoute(),
      new DeleteCountryRoute(),

      new UpdateMalariaTypeRoute(),
      new DeleteMalariaTypeRoute(),
    ].forEach(route => route.register(this.app, [authMiddleware]));

    // register home route
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'src/views/index.html'));
    });

    this.app.use(errorMiddleware);

    return new Promise(resolve => {
      this.server = this.app.listen(port, resolve);
    });
  }

}