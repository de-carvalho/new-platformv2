import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetEntrepreneurBankStatementService from '@modules/users/services/entrepreneurs/GetBankStatementService';
import GetProjectNotRefundedService from '@modules/users/services/entrepreneurs/GetProjectsNotRefundedService';

export default class GetEntrepreneurBankStatementController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getEntrepreneurBankStatementService = container.resolve(
      GetEntrepreneurBankStatementService,
    );
    const getProject = container.resolve(GetProjectNotRefundedService);

    const project = await getProject.execute({ userId: Number(user_id) });

    const bankStatement = await getEntrepreneurBankStatementService.execute({
      userId: Number(user_id),
      projectId: Number(project?.id),
    });

    return response.json(bankStatement);
  }
}
