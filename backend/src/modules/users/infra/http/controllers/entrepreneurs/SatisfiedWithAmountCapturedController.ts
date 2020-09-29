import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SatisfiedWithAmountCapturedService from '@modules/users/services/entrepreneurs/SatisfiedWithAmountCapturedService';

export default class GetProjectToLiberateWithdrawController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { project_id } = request.query;

    const projectSatisfied = container.resolve(
      SatisfiedWithAmountCapturedService,
    );

    const project = await projectSatisfied.execute({
      userId: Number(user_id),
      projectId: Number(project_id),
    });

    return response.json(project);
  }
}
