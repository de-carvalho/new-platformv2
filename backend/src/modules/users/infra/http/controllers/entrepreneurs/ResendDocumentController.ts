/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResendEntrepreneurDocumentService from '@modules/users/services/entrepreneurs/ResendEntrepreneurDocumentService';

export default class ResendEntrepreneurDocumentController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id, field } = request.query;

    const resendEntrepreneurDocumentService = container.resolve(
      ResendEntrepreneurDocumentService,
    );

    await resendEntrepreneurDocumentService.execute({
      field: String(field),
      document: request.file.filename,
      userId: parseInt(`${user_id}`),
      projectId: parseInt(`${project_id}`),
    });

    return response.json({ message: 'Documento atualizado!' });
  }
}
