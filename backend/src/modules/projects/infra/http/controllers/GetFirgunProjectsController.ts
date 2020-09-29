import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetFirgunProjectsService from '@modules/projects/services/GetFirgunProjectsService';

export default class GetFirgunProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const firgunProjects = container.resolve(GetFirgunProjectsService);

    const projects = await firgunProjects.execute();

    return response.json(classToClass(projects));
  }
}
