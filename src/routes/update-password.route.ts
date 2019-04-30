import { Route, HttpMethod } from '../classes/route';
import { Connection } from 'typeorm';
import { UserModel } from '../models/user.model';
import { UserManager } from '../classes/user-manager';
export class UpdatePasswordRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/update-password';
  }

  public async routeFunction(params, db: Connection) {
    if (!params.password) {
      throw 'Password not supplied';
    }

    const users = db.getRepository(UserModel);

    const user = await users.findOne({
      token: params.token
    });

    if (!user) {
      throw 'Not logged in';
    }

    user.passwordHash = UserManager.hashPassword(params.password);

    await users.save(user);
  }
}