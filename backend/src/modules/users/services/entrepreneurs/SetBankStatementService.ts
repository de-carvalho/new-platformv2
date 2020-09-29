/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
import { injectable, inject } from 'tsyringe';

import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';

interface IRequest {
  dueDate: Date;
  userId: number;
  amount: string;
  installment: number;
  status: string;
  state: string;
  projectId: number;
  projectName: string;
}

@injectable()
class EntrepreneurBankStatementService {
  constructor(
    @inject('EntrepreneurBankStatementRepository')
    private entrepreneursRepository: IEntrepreneurBankStatementRepository,
  ) {}

  public async execute({
    amount,
    dueDate,
    installment,
    state,
    status,
    userId,
    projectId,
    projectName,
  }: IRequest): Promise<void> {
    await this.entrepreneursRepository.create({
      amount,
      dueDate,
      installment,
      state,
      status,
      userId,
      projectId,
      projectName,
    });
  }
}

export default EntrepreneurBankStatementService;
