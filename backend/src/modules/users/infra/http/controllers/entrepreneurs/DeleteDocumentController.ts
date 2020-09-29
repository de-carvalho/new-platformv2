/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteEntrpreneurDocumentService from '@modules/users/services/entrepreneurs/DeleteEntrepreneurDocumentService';

export default class DeleteEntrpreneurDocumentController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id, field } = request.query;

    const deleteEntrpreneurDocumentService = container.resolve(
      DeleteEntrpreneurDocumentService,
    );

    await deleteEntrpreneurDocumentService.execute({
      field: String(field),
      userId: parseInt(`${user_id}`),
      projectId: parseInt(`${project_id}`),
    });

    return response.json({ message: 'Documento removido!' });
  }
}
