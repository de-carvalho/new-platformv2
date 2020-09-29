/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AdminDocumentsToSupporterService from '@modules/users/services/admin/SendDocumentsToSupporterService';
import GetDocumentsSendedToSupporterService from '@modules/users/services/admin/GetDocumentsSendedToSupporterService';
import ResendDocumentToSupporterService from '@modules/users/services/admin/ResendDocumentsToSupporterService';

export default class AdminDocumentsToSupporterController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { supporterId } = request.body;

    const getDocuments = container.resolve(
      GetDocumentsSendedToSupporterService,
    );

    const documents = await getDocuments.execute({
      supporterId,
      userId: parseInt(`${user_id}`),
    });

    return response.json(classToClass(documents));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { field, supporterId } = request.body;

    const adminDocumentsToSupporter = container.resolve(
      AdminDocumentsToSupporterService,
    );

    const supporterDatas = await adminDocumentsToSupporter.execute({
      document: request.file.filename,
      field,
      userId: parseInt(`${user_id}`),
      supporterId,
    });

    return response.json(supporterDatas);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { field, supporterId } = request.body;

    const adminDocumentsToSupporter = container.resolve(
      ResendDocumentToSupporterService,
    );

    const supporterDatas = await adminDocumentsToSupporter.execute({
      document: request.file.filename,
      field,
      userId: parseInt(`${user_id}`),
      supporterId,
    });

    return response.json(supporterDatas);
  }
}
