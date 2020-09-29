/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetProjectsConfirmedService from '@modules/users/services/admin/GetProjectsConfirmedByEntrepreneurService';

export default class AdminCheckProjectController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getProjectsConfirmedService = container.resolve(
      GetProjectsConfirmedService,
    );

    const projects = await getProjectsConfirmedService.execute();

    return response.json(classToClass(projects));
  }
}
