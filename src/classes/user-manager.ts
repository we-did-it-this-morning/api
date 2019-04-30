import { UserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
export class UserManager {
  public static generateUserFromUsernamePassword(username, password): UserModel {
    const user: UserModel = new UserModel();
    user.username = username.trim();

    const hashedPassword = this.hashPassword(password);
    user.passwordHash = hashedPassword;

    return user;
  }

  public static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}