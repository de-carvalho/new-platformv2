/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetEntrepreneurDocuments from '@modules/users/services/entrepreneurs/GetEntrepreneurDocumentsService';

export default class GetDocumentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const entrepreneurDocuments = container.resolve(GetEntrepreneurDocuments);

    const entrepreneurDocs = await entrepreneurDocuments.execute(
      parseInt(`${user_id}`),
    );
    return response.json(classToClass(entrepreneurDocs));
  }
}
