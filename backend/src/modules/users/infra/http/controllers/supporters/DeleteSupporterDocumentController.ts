/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteSupporterDocumentService from '@modules/users/services/supporters/DeleteSupporterDocumentService';

export default class UpdateUserController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { field } = request.body;

    const deleteSupporterDocumentService = container.resolve(
      DeleteSupporterDocumentService,
    );

    await deleteSupporterDocumentService.execute({
      field,
      userId: parseInt(`${user_id}`),
    });

    return response.json({ message: 'Documento removido!' });
  }
}
