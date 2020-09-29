import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetPausedProjectsService from '@modules/projects/services/GetPausedProjectsService';

export default class GetPausedProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const projectsPaused = container.resolve(GetPausedProjectsService);

    const projects = await projectsPaused.execute();

    return response.json(classToClass(projects));
  }
}
