/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetProjectsCompletedService from '@modules/users/services/partners/GetCompletedProjectsSupportedService';

export default class GetProjectsCompletedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const projectsCompleted = container.resolve(GetProjectsCompletedService);

    const projects = await projectsCompleted.execute(parseInt(`${user_id}`));

    return response.json(projects);
  }
}
