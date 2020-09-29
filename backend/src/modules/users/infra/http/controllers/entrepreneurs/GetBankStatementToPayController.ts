/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetEntrepreneurBankStatementToPayService from '@modules/users/services/entrepreneurs/GetBankStatementToPayService';
import GetProjectNotRefundedService from '@modules/users/services/entrepreneurs/GetProjectsNotRefundedService';

export default class GetEntrepreneurBankStatementController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getEntrepreneurBankStatementService = container.resolve(
      GetEntrepreneurBankStatementToPayService,
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
