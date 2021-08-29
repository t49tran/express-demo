export const secrets = Object.freeze({
  ENVIRONMENT: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  PASSWORD_SALT: parseInt(process.env.PASSWORD_SALT || '10', 10)
});
