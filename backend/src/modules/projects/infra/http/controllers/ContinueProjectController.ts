import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ContinueProjectService from '@modules/projects/services/ContinueProjectService';

export default class ContinueProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const continueProject = container.resolve(ContinueProjectService);

    await continueProject.execute({
      userId: Number(user_id),
      projectId: Number(project_id),
    });

    return response.json({ message: 'Projeto continuado com sucesso' });
  }
}
