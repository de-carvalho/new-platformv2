import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CalcsService from '@modules/calculations/services/FirgunInterestService';

export default class CalscsController {
  public async calculate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { amount } = request.body;

    const calcs = container.resolve(CalcsService);

    const resultData = await calcs.execute({ amount });

    return response.json(resultData);
  }
}
