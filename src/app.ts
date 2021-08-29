// tslint:disable-next-line:no-submodule-imports no-var-requires
require('module-alias/register');

import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { authRoutes } from 'src/controllers/auth';
import { userRoutes } from 'src/controllers/user';
import { createTypeOrmMiddleware } from './services/mysql';
import cors from 'cors';

const app = express();

app.set('port', process.env.EXPRESS_PORT || 3000);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(createTypeOrmMiddleware());
app.use(cors());

app.get('/', (req: Request, res: Response) =>
  res.json({
    message: 'ready'
  })
);

app.use('/', authRoutes);
app.use('/users', userRoutes);

export { app };
