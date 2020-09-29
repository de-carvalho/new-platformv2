import { injectable, inject } from 'tsyringe';

import Balance from '../infra/typeorm/entities/Balance';
import IBalanceRepository from '../repositories/IGetAccountBalanceRepository';

interface IRequest {
  accessToken: string;
  future: string;
  date: Date;
  unavailable: string;
  current: string;
  moipAccountId: string;
  userId: number;
}

@injectable()
class GetAccountBalanceService {
  constructor(
    @inject('BalanceRepository')
    private balanceRepository: IBalanceRepository,
  ) {}

  public async execute({
    accessToken,
    current,
    future,
    date,
    moipAccountId,
    unavailable,
    userId,
  }: IRequest): Promise<Balance> {
    const findUserBalance = await this.balanceRepository.findById(userId);

    // Verifica se existe o registro, caso não, então cria o registro de consulta
    if (!findUserBalance) {
      const balanceCreated = await this.balanceRepository.create({
        accessToken,
        current,
        future,
        date,
        moipAccountId,
        unavailable,
        userId,
      });

      return balanceCreated;
    }

    // Atualiza os dados do saldo no banco de dados
    findUserBalance.date = date;
    findUserBalance.current = current;
    findUserBalance.future = future;
    findUserBalance.unavailable = unavailable;

    const balanceUpdated = await this.balanceRepository.update(findUserBalance);

    return balanceUpdated;
  }
}

export default GetAccountBalanceService;
