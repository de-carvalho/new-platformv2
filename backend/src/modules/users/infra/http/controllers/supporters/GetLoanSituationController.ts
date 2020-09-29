/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetLoanSituationService from '@modules/users/services/supporters/GetSupporterLoanSituationService';

export default class UpdateUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getSupporterLoanSituantion = container.resolve(
      GetLoanSituationService,
    );

    const supporterDatas = await getSupporterLoanSituantion.execute(
      parseInt(`${user_id}`),
    );

    return response.json(supporterDatas);
  }
}
