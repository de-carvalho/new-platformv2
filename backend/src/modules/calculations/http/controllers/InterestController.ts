import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CalcsService from '@modules/calculations/services/InterestService';

export default class CalscsController {
  public async calculate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { amount, interest, times } = request.body;

    const calcs = container.resolve(CalcsService);

    const resultData = await calcs.execute({ amount, interest, times });

    return response.json(resultData);
  }
}
