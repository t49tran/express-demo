import { Request, Response, NextFunction } from 'express';
import {
  Connection,
  getConnection,
  createConnection,
  getConnectionManager
} from 'typeorm';
import { userService, UserService } from './user';

declare global {
  namespace Express {
    interface Request {
      dbConnection?: Connection;
      userService?: UserService;
    }
  }
}

export const createTypeOrmMiddleware =
  () => async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const connectionManager = getConnectionManager();
      const connection = connectionManager.has('default')
        ? await getConnection()
        : await createConnection();

      req.dbConnection = connection;

      req.userService = userService(connection);
    } catch (error) {
      console.error('Error establishing database connection', error.message);
    } finally {
      next();
    }
  };
