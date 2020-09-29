import { getRepository, Repository } from 'typeorm';

import IEntrepreneurPortfolioRepository from '@modules/users/repositories/IEntrepreneurPortfolioRepository';
import IEntrepreneurPortfolioDTO from '@modules/users/dtos/ICreateEntrepreneurPortfolioDTO';

import EntrepreneurPortfolio from '../../entities/EntrepreneurPortfolio';

class EntrepreneurPortfolioRepository
  implements IEntrepreneurPortfolioRepository {
  private ormRepository: Repository<EntrepreneurPortfolio>;

  constructor() {
    this.ormRepository = getRepository(EntrepreneurPortfolio);
  }

  public async getUserData(
    partnerId: number,
    projectId: number,
  ): Promise<EntrepreneurPortfolio[] | undefined> {
    const userData = await this.ormRepository.find({
      where: { partnerId, projectId },
    });

    return userData;
  }

  public async findEntrepreneur(
    userId: number,
    projectId: number,
    installment: number,
  ): Promise<EntrepreneurPortfolio | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId, projectId, installment },
    });

    return userData;
  }

  public async create(
    userData: IEntrepreneurPortfolioDTO,
  ): Promise<EntrepreneurPortfolio> {
    const userPortfolio = this.ormRepository.create(userData);

    await this.ormRepository.save(userPortfolio);

    return userPortfolio;
  }

  public async save(
    user: EntrepreneurPortfolio,
  ): Promise<EntrepreneurPortfolio> {
    const updatedData = this.ormRepository.save(user);

    return updatedData;
  }
}

export default EntrepreneurPortfolioRepository;
