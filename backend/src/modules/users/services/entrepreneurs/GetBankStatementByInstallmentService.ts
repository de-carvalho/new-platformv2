/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppErrors';
import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';

import EntrepreneurBankStatement from '../../infra/typeorm/entities/EntrepreneurBankStatement';

interface IRequest {
  userId: number;
  projectId: number;
  installment: number;
}

@injectable()
class GetEntrepreneurBankStatementByInstallmentService {
  constructor(
    @inject('EntrepreneurBankStatementRepository')
    private entrepreneursRepository: IEntrepreneurBankStatementRepository,
  ) {}

  public async execute({
    userId,
    installment,
    projectId,
  }: IRequest): Promise<EntrepreneurBankStatement> {
    const bankStatement = await this.entrepreneursRepository.findByInstallment(
      userId,
      installment,
      projectId,
    );

    if (!bankStatement) {
      throw new AppError(
        'Nenhum registro referente a essa parcela foi encontrado',
      );
    }

    // Verifica se a parcela está vencida
    const dueDateCreatedAt = String(bankStatement.dueDate).split('-');

    const dueDate = new Date(
      Number(dueDateCreatedAt[0]),
      Number(dueDateCreatedAt[1]),
      Number(dueDateCreatedAt[2]),
    );
    const compareDate = addHours(dueDate, 18);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Essa parcela está vencida, renegocie-a');
    }

    return bankStatement;
  }
}

export default GetEntrepreneurBankStatementByInstallmentService;
