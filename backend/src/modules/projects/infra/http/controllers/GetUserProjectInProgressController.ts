/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetUserProjectsInProgressService from '@modules/projects/services/GetUserProjectInProgressService';

export default class UserProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const projectInProgress = container.resolve(
      GetUserProjectsInProgressService,
    );

    const project = await projectInProgress.execute(parseInt(`${user_id}`));

    return response.json(classToClass(project));
  }
}
