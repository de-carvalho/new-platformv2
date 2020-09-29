/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetProjectsInProgressService from '@modules/users/services/partners/GetProjectInProgressService';

export default class GetProjectsInProgressController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const projectsInProgress = container.resolve(GetProjectsInProgressService);

    const projects = await projectsInProgress.execute(parseInt(`${user_id}`));

    return response.json(projects);
  }
}
