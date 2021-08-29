import jwt from 'jsonwebtoken';
import { User } from 'src/entity/User';
import { logger } from 'src/services/logger';
import { secrets } from 'src/services/secret';

export const sign = (user: User) => {
  const { JWT_SECRET } = secrets;

  if (!JWT_SECRET) {
    logger.error('No jwt secret string found');

    throw Error('No jwt secret found');
  }

  return jwt.sign({ ...user, iat: Date.now() }, JWT_SECRET);
};
