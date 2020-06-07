import 'reflect-metadata';
import cors from 'cors';

import path from 'path';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { errors as celebrateErrors } from 'celebrate';

import { JsonWebTokenError } from 'jsonwebtoken';

import '../../container';

import routes from './routes';
import AppError from '../../errors/AppError';

import createConnection from '../database';

createConnection().catch(err => {
  console.error(err); // eslint-disable-line no-console
  console.log('Unable to connect to database due to error above. Exiting...'); // eslint-disable-line no-console
  process.exit(1);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  '/static',
  express.static(path.join(__dirname, '..', process.env.STATIC_DIR)),
);
app.use(routes);

app.use(celebrateErrors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof JsonWebTokenError) {
    return response.status(401).json({
      status: 'error',
      message: 'Unauthorized.',
    });
  }

  // TODO: errors that arrive here need to be logged and treated.
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
