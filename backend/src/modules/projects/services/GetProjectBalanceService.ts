import { injectable, inject } from 'tsyringe';

import Balance from '../infra/typeorm/entities/ProjectBalance';
import IBalanceRepository from '../repositories/IProjectBalanceRepository';

interface IRequest {
  accessToken: string;
  future: string;
  date: Date;
  unavailable: string;
  current: string;
  moipAccountId: string;
  projectId: number;
}

@injectable()
class GetProjectBalanceService {
  constructor(
    @inject('ProjectBalanceRepository')
    private balanceRepository: IBalanceRepository,
  ) {}

  public async execute({
    accessToken,
    current,
    future,
    date,
    moipAccountId,
    unavailable,
    projectId,
  }: IRequest): Promise<Balance> {
    const findProjectBalance = await this.balanceRepository.findById(projectId);

    // Verifica se existe o registro, caso não, então cria o registro de consulta
    if (!findProjectBalance) {
      const balanceCreated = await this.balanceRepository.create({
        accessToken,
        current,
        future,
        date,
        moipAccountId,
        unavailable,
        projectId,
      });

      return balanceCreated;
    }

    // Atualiza os dados do saldo no banco de dados
    findProjectBalance.date = date;
    findProjectBalance.current = current;
    findProjectBalance.future = future;
    findProjectBalance.unavailable = unavailable;

    const balanceUpdated = await this.balanceRepository.update(
      findProjectBalance,
    );

    return balanceUpdated;
  }
}

export default GetProjectBalanceService;
