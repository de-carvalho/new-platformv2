/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetFirgunDocumentsService from '@modules/users/services/entrepreneurs/GetFirgunDocumentsService';

export default class GetFirgunDocumentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const getFirgunDocuments = container.resolve(GetFirgunDocumentsService);

    const entrepreneurDatas = await getFirgunDocuments.execute(
      Number(user_id),
      Number(project_id),
    );

    return response.json(classToClass(entrepreneurDatas));
  }
}
