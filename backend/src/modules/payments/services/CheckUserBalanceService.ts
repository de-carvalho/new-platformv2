import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Balance from '@modules/balance/infra/typeorm/entities/Balance';
import ITransfersRepository from '../repositories/ITransfersRepository';

@injectable()
class CheckUserBalanceService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
  ) {}

  public async execute(
    userId: number,
    amount: string,
  ): Promise<Balance | undefined> {
    const userBalance = await this.transfers.checkUserBalance(userId);

    if (userBalance) {
      if (parseFloat(userBalance.current) <= 0) {
        throw new AppError(
          'O seu saldo é insuficiente para completar a operação.',
        );
      }

      if (parseFloat(amount) > parseFloat(userBalance.current)) {
        throw new AppError(
          'O valor a ser transferido não pode ser maior que seu saldo atual',
        );
      }
    }
    return userBalance;
  }
}

export default CheckUserBalanceService;
