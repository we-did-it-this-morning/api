import * as express from 'express';


export const authMiddleware: express.RequestHandler = async(req, res, next) => {
  const token = req.headers.authorization;
  
  const authenticated = await isAuthenticated(token);

  next(authenticated ? undefined : {
    message: 'Not authorised'
  });
}

async function isAuthenticated(token) {
  return false;
}