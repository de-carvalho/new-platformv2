/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResendSupporterDocumentService from '@modules/users/services/supporters/ResendSupporterDocumentService';

export default class ResendSupporterDocumentController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { field } = request.body;

    const resendSupporterDocumentService = container.resolve(
      ResendSupporterDocumentService,
    );

    await resendSupporterDocumentService.execute({
      field,
      document: request.file.filename,
      userId: parseInt(`${user_id}`),
    });

    return response.json({ message: 'Documento atualizado!' });
  }
}
