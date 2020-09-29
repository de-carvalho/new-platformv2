import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterLoanSituation from '../../infra/typeorm/entities/SupporterLoanSituation';
import ISupporterLoanSituationRepository from '../../repositories/ISupporterLoanSituationRepository';

@injectable()
class GetSupporterLoanSituationService {
  constructor(
    @inject('SupporterLoanSituationRepository')
    private supportersRepository: ISupporterLoanSituationRepository,
  ) {}

  public async execute(
    userId: number,
  ): Promise<SupporterLoanSituation[] | undefined> {
    const findSupporterDatas = await this.supportersRepository.getUserData(
      userId,
    );

    if (findSupporterDatas?.length === 0) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    return findSupporterDatas;
  }
}

export default GetSupporterLoanSituationService;
