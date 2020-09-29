/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetProjectsCheckedService from '@modules/users/services/entrepreneurs/GetProjectAnalisedService';

export default class GetProjectsAnalisedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const getProjectsCheckedService = container.resolve(
      GetProjectsCheckedService,
    );

    const projects = await getProjectsCheckedService.execute(
      parseInt(user_id),
      parseInt(`${project_id}`),
    );

    return response.json(projects);
  }
}
