import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterBankStatement from '../../infra/typeorm/entities/SupporterBankStatement';
import ISupporterBankStatementRepository from '../../repositories/ISupporterBankStatementRepository';

@injectable()
class GetSupporterBankStatementService {
  constructor(
    @inject('SupporterBankStatementRepository')
    private supportersRepository: ISupporterBankStatementRepository,
  ) {}

  public async execute(
    userId: number,
  ): Promise<SupporterBankStatement[] | undefined> {
    const findSupporterDatas = await this.supportersRepository.getUserData(
      userId,
    );

    if (findSupporterDatas?.length === 0) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    return findSupporterDatas;
  }
}

export default GetSupporterBankStatementService;
