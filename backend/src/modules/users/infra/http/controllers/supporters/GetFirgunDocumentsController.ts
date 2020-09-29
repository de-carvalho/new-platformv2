/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetFirgunDocumentsService from '@modules/users/services/supporters/GetFirgunDocumentsService';

export default class GetFirgunDocumentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getFirgunDocuments = container.resolve(GetFirgunDocumentsService);

    const supporterDatas = await getFirgunDocuments.execute(
      parseInt(`${user_id}`),
    );

    return response.json(classToClass(supporterDatas));
  }
}
