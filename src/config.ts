export const config = {
  userExpiresTime: 86400000,
  isProdMode: process.env.NODE && ~process.env.NODE.indexOf('heroku'),
};
