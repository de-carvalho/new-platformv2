import IEntrepreneurPortfolioDTO from '@modules/users/dtos/ICreateEntrepreneurPortfolioDTO';
import EntrepreneurPortfolio from '../infra/typeorm/entities/EntrepreneurPortfolio';

export default interface IEntrepreneurPortfolioRepository {
  create(data: IEntrepreneurPortfolioDTO): Promise<EntrepreneurPortfolio>;
  save(user: EntrepreneurPortfolio): Promise<EntrepreneurPortfolio>;
  getUserData(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneurPortfolio[] | undefined>;
  findEntrepreneur(
    userId: number,
    projectId: number,
    installment: number,
  ): Promise<EntrepreneurPortfolio | undefined>;
}
