/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetSupporterDocumentsService from '@modules/users/services/admin/GetSupportersDocumentsService';

export default class GetSupporterDocumentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { supporterId } = request.body;

    const supporterDocuments = container.resolve(GetSupporterDocumentsService);

    const supporterDatas = await supporterDocuments.execute({
      supporterId,
      userId: parseInt(`${user_id}`),
    });

    return response.json(classToClass(supporterDatas));
  }
}
