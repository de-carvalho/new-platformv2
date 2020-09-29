/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetEntrepreneurDocumentsService from '@modules/users/services/admin/GetEntrepreneursDocumentsService';

export default class GetEntrepreneurDocumentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { entrepreneurId, projectId } = request.body;

    const entrepreneurDocuments = container.resolve(
      GetEntrepreneurDocumentsService,
    );

    const entrepreneurDatas = await entrepreneurDocuments.execute({
      entrepreneurId,
      userId: parseInt(`${user_id}`),
      projectId,
    });

    return response.json(classToClass(entrepreneurDatas));
  }
}
