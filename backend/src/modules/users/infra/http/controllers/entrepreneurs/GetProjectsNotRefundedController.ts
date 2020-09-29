/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetProjectsNotRefundedService from '@modules/users/services/entrepreneurs/GetProjectsNotRefundedService';

export default class GetProjectsNotRefundedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getProjectsCheckedService = container.resolve(
      GetProjectsNotRefundedService,
    );

    const projects = await getProjectsCheckedService.execute({
      userId: Number(user_id),
    });

    return response.json(projects);
  }
}
