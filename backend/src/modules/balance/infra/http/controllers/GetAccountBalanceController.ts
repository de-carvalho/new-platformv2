import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppErrors';
import moipServices from '@shared/moip/services';
import User from '@modules/users/infra/typeorm/entities/User';
import GetAccountBalanceService from '@modules/balance/services/GetAccountBalanceService';

export default class GetAccountBalanceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const usersRepository = getRepository(User);
    const getBalance = container.resolve(GetAccountBalanceService);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const currentBalance = await moipServices.AccountBalance(user.moipToken);

    const balance = await getBalance.execute({
      accessToken: user.moipToken,
      date: currentBalance.date,
      current: currentBalance.current,
      future: currentBalance.future,
      moipAccountId: user.moipAccountId,
      unavailable: currentBalance.unavailable,
      userId: user.id,
    });

    return response.json(balance);
  }
}
