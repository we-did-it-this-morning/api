import { Connection } from 'typeorm';
import { UserModel } from './../models/user.model';
import * as bcrypt from "bcrypt";
import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';
import { UserManager } from '../classes/user-manager';

export class RegisterRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/register';
  }

  public async routeFunction(params, db: Connection) {
    if (!params.username || !params.password || params.username.trim().length == 0 || params.password.trim().length == 0)
      throw 'Missing username and/or password';
      
    const user = UserManager.generateUserFromUsernamePassword(params.username, params.password);

    const users = db.getRepository(UserModel);
    
    const existingUser = await users.findOne({
      username: user.username
    });

    if (existingUser) {
      throw 'A user with that username already exists';
    }
    
    await users.save(user);

    return {
      ...params,
      message: 'Registered user'
    };
  }
}