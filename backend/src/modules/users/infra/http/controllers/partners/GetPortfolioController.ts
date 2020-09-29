/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetEntrepreneurPortfolio from '@modules/users/services/partners/GetEntrepreneurPortfolioService';

export default class EntrepreneurPortfolio {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const entrepreneurPortfolio = container.resolve(GetEntrepreneurPortfolio);

    const entrepreneurData = await entrepreneurPortfolio.getAllPortfolios(
      parseInt(`${user_id}`),
    );

    return response.json(entrepreneurData);
  }
}
