/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CalcSupporterService from '@modules/calculations/services/SupporterInterestService';

export default class SupporterInterestController {
  public async calculate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { amount, amountEntrepreneur, times, balanceDue } = request.body;

    const calcs = container.resolve(CalcSupporterService);

    const resultData = await calcs.execute({
      amount,
      amountEntrepreneur,
      balanceDue,
      times,
    });

    return response.json(resultData);
  }
}
