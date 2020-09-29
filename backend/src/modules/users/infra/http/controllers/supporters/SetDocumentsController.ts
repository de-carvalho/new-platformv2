/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SupporterDocumentService from '@modules/users/services/supporters/SetSupporterDocumentsService';

export default class SupporterDocumentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { field } = request.body;

    const supporterDocumentService = container.resolve(
      SupporterDocumentService,
    );

    const supporterDatas = await supporterDocumentService.execute({
      document: request.file.filename,
      field,
      userId: parseInt(`${user_id}`),
    });

    return response.json(supporterDatas);
  }
}
