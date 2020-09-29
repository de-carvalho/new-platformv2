/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetUserProjectsCompletedService from '@modules/projects/services/GetUserProjectsCompletedService';

export default class UserProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const projectCompleted = container.resolve(GetUserProjectsCompletedService);

    const projects = await projectCompleted.execute(parseInt(`${user_id}`));

    return response.json(classToClass(projects));
  }
}
