/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetProjectsSupportersService from '@modules/projects/services/GetProjectInvestorsService';

export default class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.query;

    const supporters = container.resolve(GetProjectsSupportersService);

    const investors = await supporters.execute(parseInt(`${project_id}`));

    return response.json(investors);
  }
}
