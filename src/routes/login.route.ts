import { Connection } from 'typeorm';
import { HttpMethod } from './../classes/route';
import { Route } from '../classes/route';
import { UserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as uuidv4 from 'uuid/v4';

export class LoginRoute extends Route {
  public getMethod() {
    return HttpMethod.POST;
  }

  public endpointName() {
    return '/log-in';
  }

  public async routeFunction(params, db: Connection) {
    if (!params.username || !params.password || params.username.trim().length == 0 || params.password.trim().length == 0)
      throw 'Missing username and/or password';
      
    const username = params.username.trim();

    const users = db.getRepository(UserModel);
    
    const existingUser: UserModel = await users.findOne({
      username: username
    });

    console.log(existingUser);

    if (!existingUser) {
      throw 'A user with that username does not exist';
    }

    if (!bcrypt.compareSync(params.password.trim(), existingUser.passwordHash)) {
      throw 'Invalid password';
    }

    const token = uuidv4();
    existingUser.token = token;
    existingUser.expires = new Date(Date.now() + 86400000);

    users.save(existingUser);
    
    return {
      token: token
    };
  }
}