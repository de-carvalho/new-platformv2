import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IEntrepreneurPortfolioRepository from '@modules/users/repositories/IEntrepreneurPortfolioRepository';
import EntrepreneurPortfolio from '../../infra/typeorm/entities/EntrepreneurPortfolio';

@injectable()
class UpdateEntrepreneurPortfolioService {
  constructor(
    @inject('EntrepreneurPortfolioRepository')
    private entrepreneursRepository: IEntrepreneurPortfolioRepository,
  ) {}

  public async execute(
    entrepreneurId: number,
    projectId: number,
    installment: number,
  ): Promise<EntrepreneurPortfolio> {
    const findUser = await this.entrepreneursRepository.findEntrepreneur(
      entrepreneurId,
      projectId,
      installment,
    );

    if (!findUser) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    findUser.status = 'Em dia';
    findUser.state = 'Quitada';

    await this.entrepreneursRepository.save(findUser);

    return findUser;
  }
}

export default UpdateEntrepreneurPortfolioService;
