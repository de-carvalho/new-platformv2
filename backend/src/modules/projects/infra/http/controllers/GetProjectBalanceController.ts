/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import moipServices from '@shared/moip/services';
import GetProjectBalanceService from '@modules/projects/services/GetProjectBalanceService';
import CheckProjectForBalanceService from '@modules/projects/services/CheckProjectForBalanceService';

export default class GetAccountBalanceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const getBalance = container.resolve(GetProjectBalanceService);
    const checkProject = container.resolve(CheckProjectForBalanceService);

    const project = await checkProject.execute(
      parseInt(`${user_id}`),
      parseInt(`${project_id}`),
    );

    const currentBalance = await moipServices.AccountBalance(
      `${project?.moipToken}`,
    );

    const balance = await getBalance.execute({
      accessToken: `${project?.moipToken}`,
      date: currentBalance.date,
      current: currentBalance.current,
      future: currentBalance.future,
      moipAccountId: `${project?.moipAccountId}`,
      unavailable: currentBalance.unavailable,
      projectId: parseInt(`${project?.id}`),
    });

    return response.json(classToClass(balance));
  }
}
