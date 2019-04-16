import * as express from 'express';
import { Database } from '../classes/database';
import { UserModel } from '../models/user.model';
import { config } from '../config';


export const authMiddleware: express.RequestHandler = async(req, res, next) => {
  const token = req.query.token || req.body.token;
  console.log('auth token', token);
  
  const authenticated = await isAuthenticated(token);

  next(authenticated ? undefined : {
    message: 'Not authorised'
  });
}

async function isAuthenticated(token) {
  const db = await Database.get();
  const users = db.getRepository(UserModel);
  const user = await users.findOne({
    token: token
  });

  if (!user) {
    // couldn't find a user with that token
    return false;
  }

  // user with that token exists. Check if the token has expired
  if (user.expires < new Date()) {
    return false;
  }

  user.expires = new Date(user.expires.getTime() + config.userExpiresTime);

  await users.save(user);
  return true;
}