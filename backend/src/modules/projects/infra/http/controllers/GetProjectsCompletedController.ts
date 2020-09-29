import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetProjectsCompletedService from '@modules/projects/services/GetProjectsCompletedService';

export default class GetProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const projectsCompleted = container.resolve(GetProjectsCompletedService);

    const projects = await projectsCompleted.execute();

    return response.json(classToClass(projects));
  }
}
