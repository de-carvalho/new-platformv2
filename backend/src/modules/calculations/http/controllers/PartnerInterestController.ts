/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CalcPartnerService from '@modules/calculations/services/PartnerInterestService';

export default class PartnerInterestController {
  public async calculate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { amount } = request.body;

    const calcs = container.resolve(CalcPartnerService);

    const resultData = await calcs.execute({
      amount,
    });

    const partnerAmoun = {
      amount: resultData,
    };
    return response.json(partnerAmoun);
  }
}
