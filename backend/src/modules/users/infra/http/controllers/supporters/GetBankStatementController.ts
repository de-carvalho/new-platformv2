/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetBankStatementService from '@modules/users/services/supporters/GerSupporterBankStatementService';

export default class UpdateUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getSupporterBankStatement = container.resolve(
      GetBankStatementService,
    );

    const supporterDatas = await getSupporterBankStatement.execute(
      parseInt(`${user_id}`),
    );

    return response.json(supporterDatas);
  }
}
