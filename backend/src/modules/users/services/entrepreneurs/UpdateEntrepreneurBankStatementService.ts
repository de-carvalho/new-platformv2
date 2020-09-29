/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';

import EntrepreneurBankStatement from '../../infra/typeorm/entities/EntrepreneurBankStatement';

@injectable()
class EntrepreneurBankStatementService {
  constructor(
    @inject('EntrepreneurBankStatementRepository')
    private entrepreneursRepository: IEntrepreneurBankStatementRepository,
  ) {}

  public async execute(
    userId: number,
    installment: number,
    projectId: number,
  ): Promise<EntrepreneurBankStatement> {
    const findData = await this.entrepreneursRepository.findByInstallment(
      userId,
      installment,
      projectId,
    );

    if (!findData) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    findData.status = 'Em dia';
    findData.state = 'Quitada';

    await this.entrepreneursRepository.save(findData);

    return findData;
  }
}

export default EntrepreneurBankStatementService;
