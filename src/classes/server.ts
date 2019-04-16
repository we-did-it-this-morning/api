import { RegisterRoute } from './../routes/register.route';
import { LoginRoute } from './../routes/login.route';
import { HomeRoute } from '../routes/home.route';
import { SymptomRoute } from '../routes/symptoms/symptom.route';
import { UpdateSymptomRoute } from '../routes/symptoms/update-symptom.route';
import { UpdateSymptomTypeRoute } from '../routes/symptoms/update-symptom-type.route';
import { SymptomTypeRoute } from '../routes/symptoms/symptom-type.route';

import { authMiddleware } from './../middleware/auth.middleware';
import * as express from 'express';
import * as http from 'http';
import { errorMiddleware } from '../middleware/error.middleware';
import { formatMiddleware } from '../middleware/format.middleware';

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
      new UpdateSymptomRoute(),
      new UpdateSymptomTypeRoute(),
      new SymptomTypeRoute()
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