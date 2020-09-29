/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CalcRenegotiationService from '@modules/calculations/services/RenegotiationService';

export default class RenegotiationInterestController {
  public async calculate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const { project_id } = request.query;
    const { amount, times } = request.body;

    const calcs = container.resolve(CalcRenegotiationService);

    const resultData = await calcs.execute({
      amount,
      projectId: parseInt(`${project_id}`),
      userId: parseInt(`${user_id}`),
      times,
    });

    return response.json(resultData);
  }
}
