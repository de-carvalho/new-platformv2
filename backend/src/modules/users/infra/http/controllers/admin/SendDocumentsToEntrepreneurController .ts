/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AdminDocumentsToEntrepreneurService from '@modules/users/services/admin/SendDocumentToEntrepreneurService';
import GetDocumentsSendedToEntrepreneurService from '@modules/users/services/admin/GetDocumentsSendedToEntrepreneurService';

export default class AdminDocumentsToEntrepreneurController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { entrepreneur_id, project_id } = request.query;

    const getDocuments = container.resolve(
      GetDocumentsSendedToEntrepreneurService,
    );

    const documents = await getDocuments.execute({
      entrepreneurId: Number(entrepreneur_id),
      userId: Number(`${user_id}`),
      projectId: Number(project_id),
    });

    return response.json(classToClass(documents));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id, entrepreneur_id } = request.query;

    const adminDocumentsToEntrepreneur = container.resolve(
      AdminDocumentsToEntrepreneurService,
    );

    const entrepreneurDatas = await adminDocumentsToEntrepreneur.execute({
      document: request.file.filename,
      userId: parseInt(`${user_id}`),
      entrepreneurId: Number(entrepreneur_id),
      projectId: Number(project_id),
    });

    return response.json(entrepreneurDatas);
  }
}
