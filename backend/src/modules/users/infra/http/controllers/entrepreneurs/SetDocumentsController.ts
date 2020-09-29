/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EntrepreneurDocumentService from '@modules/users/services/entrepreneurs/SetEntrepreneursDocumentsService';

export default class EntrepreneurDocumentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id, field } = request.query;

    const entrepreneurDocumentService = container.resolve(
      EntrepreneurDocumentService,
    );

    const entrepreneurDatas = await entrepreneurDocumentService.execute({
      document: request.file.filename,
      field: String(field),
      userId: parseInt(`${user_id}`),
      projectId: parseInt(`${project_id}`),
    });

    return response.json(entrepreneurDatas);
  }
}
