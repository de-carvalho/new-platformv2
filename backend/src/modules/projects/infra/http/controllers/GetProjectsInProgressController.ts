import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetProjectsInProgressService from '@modules/projects/services/GetProjectsInProgressService';

export default class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const projectsInProgress = container.resolve(GetProjectsInProgressService);

    const projects = await projectsInProgress.execute();

    return response.json(classToClass(projects));
  }
}
