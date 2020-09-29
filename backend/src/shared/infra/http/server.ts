import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import uploadEntrepreneurConfig from '@config/upload_entrepreneur_documents';
import uploadSupporterConfig from '@config/upload_supporter_documents';
import uploadAdminTeamConfig from '@config/upload_admin_team_avatar';
import uploadAdminDocsConfig from '@config/upload_admin_documents';
import AppError from '@shared/errors/AppErrors';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/files', express.static(uploadSupporterConfig.uploadsFolder));
app.use('/files', express.static(uploadEntrepreneurConfig.uploadsFolder));
app.use('/files', express.static(uploadAdminTeamConfig.uploadsFolder));
app.use('/files', express.static(uploadAdminDocsConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333.');
});
