import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProjectLiberateWithdrawService from '@modules/users/services/admin/GetProjectsToLiberateWithdrawService';

export default class GetProjectToLiberateWithdrawController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const projectToLiberate = container.resolve(ProjectLiberateWithdrawService);

    const projects = await projectToLiberate.execute({
      userId: Number(user_id),
    });

    return response.json(projects);
  }
}
