import { PreventionModel } from './../models/prevention.model';
import { SeverityModel } from './../models/severity.model';
import { TreatmentTypeModel } from './../models/treatment-type.model';
import { SymptomTypeModel } from './../models/symptom-type.model';
import { SymptomModel } from './../models/symptom.model';
import { CountryModel } from './../models/country.model';
import { MalariaTypeModel } from './../models/malaria-type.model';
import { createConnection, Connection } from "typeorm";
import { TreatmentModel } from '../models/treatment.model';
import { UserModel } from '../models/user.model';
import { config } from '../config';

export class Database {
  private static connection: Connection = null;

  public static async get(): Promise<Connection> {
    if (this.connection === null) {
      await this.ready();
    }

    return this.connection;
  }

  private constructor() {}

  private static isInitialising = false;
  private static hasInitialised = false;
  private static readyListeners = [];

  public static ready() {
    return new Promise(async resolve => {
      if (this.hasInitialised) return resolve();

      this.readyListeners.push(resolve);
      if (this.isInitialising) return;
      this.isInitialising = true;

      const entities = [
        MalariaTypeModel,
        CountryModel,
        SymptomModel,
        SymptomTypeModel,
        TreatmentModel,
        TreatmentTypeModel,
        UserModel,
        SeverityModel,
        PreventionModel,
      ];

      if (config.isProdMode) {
        this.connection = await createConnection({
          type: "postgres",
          url: process.env.DATABASE_URL,
          entities,
          synchronize: true
        });
      }
      else {
        this.connection = await createConnection({
          type: "sqlite",
          database: "db.sqlite",
          entities,
          synchronize: true
        });
      }

      Database.hasInitialised = true;
      while (this.readyListeners.length) {
        this.readyListeners[0]();
        this.readyListeners.shift();
      }
    });
  }
}