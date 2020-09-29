import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import ProjectBalance from '@modules/projects/infra/typeorm/entities/ProjectBalance';
import ITransfersRepository from '../repositories/ITransfersRepository';

@injectable()
class CheckProjectBalanceService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
  ) {}

  public async execute(
    projectId: number,
    amount: string,
    userId: number,
  ): Promise<ProjectBalance | undefined> {
    const projectBalance = await this.transfers.checkProjectBalance(projectId);
    const findUser = await this.transfers.findUserById(userId);
    const findProject = await this.transfers.findProject(projectId);

    if (!findUser) {
      throw new AppError('O usuário não foi encontrado');
    }

    if (!findProject) {
      throw new AppError('O projeto não foi encontrado');
    }

    if (findUser.id !== findProject.entrepreneurId) {
      throw new AppError(
        'Você não está habilitado para completar a operação',
        401,
      );
    }

    if (findProject.state !== 'COMPLETED') {
      throw new AppError('O projeto ainda está em andamento');
    }

    if (findProject.releasedForWithdrawal !== true) {
      throw new AppError('Você ainda não foi liberado para saque');
    }

    // Verificação do saldo do projeto
    if (projectBalance) {
      if (parseFloat(projectBalance.current) <= 0) {
        throw new AppError(
          'O seu saldo é insuficiente para completar a operação.',
          401,
        );
      }

      if (parseFloat(amount) > parseFloat(projectBalance.current)) {
        throw new AppError(
          'O valor a ser transferido não pode ser maior que seu saldo atual do projeto',
          401,
        );
      }
    }

    if (
      !findUser.bankNumber ||
      !findUser.bankAccountNumber ||
      !findUser.bankAgencyNumber ||
      !findUser.bankAccountType
    ) {
      throw new AppError(
        'Os dados bancários não estão completos, edite seus dados e informe seus dados bancários',
        401,
      );
    }

    return projectBalance;
  }
}

export default CheckProjectBalanceService;
