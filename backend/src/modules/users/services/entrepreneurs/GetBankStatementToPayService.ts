/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';

import EntrepreneurBankStatement from '../../infra/typeorm/entities/EntrepreneurBankStatement';

interface IRequest {
  userId: number;
  projectId: number;
}

@injectable()
class GetEntrepreneurBankStatementService {
  constructor(
    @inject('EntrepreneurBankStatementRepository')
    private entrepreneursRepository: IEntrepreneurBankStatementRepository,
  ) {}

  public async execute({
    userId,
    projectId,
  }: IRequest): Promise<EntrepreneurBankStatement[]> {
    const bankStatement = await this.entrepreneursRepository.getUserDataToPay(
      userId,
      projectId,
    );

    if (bankStatement?.length === 0) {
      throw new AppError('Nenhum registro foi encontrado.');
    }
    return bankStatement;
  }
}

export default GetEntrepreneurBankStatementService;
