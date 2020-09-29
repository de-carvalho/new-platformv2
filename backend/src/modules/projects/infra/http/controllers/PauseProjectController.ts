import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PauseProjectService from '@modules/projects/services/PauseProjectService';

export default class PauseProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const pauseProject = container.resolve(PauseProjectService);

    await pauseProject.execute({
      userId: Number(user_id),
      projectId: Number(project_id),
    });

    return response.json({ message: 'Projeto pausado com sucesso' });
  }
}
