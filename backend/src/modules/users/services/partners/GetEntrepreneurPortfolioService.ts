import { injectable, inject } from 'tsyringe';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppErrors';
import IEntrepreneurPortfolioRepository from '@modules/users/repositories/IEntrepreneurPortfolioRepository';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import EntrepreneurPortfolio from '../../infra/typeorm/entities/EntrepreneurPortfolio';

@injectable()
class GetEntrepreneurPortfolioService {
  constructor(
    @inject('EntrepreneurPortfolioRepository')
    private entrepreneursRepository: IEntrepreneurPortfolioRepository,
  ) {}

  public async execute(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneurPortfolio[] | undefined> {
    const findUser = await this.entrepreneursRepository.getUserData(
      userId,
      projectId,
    );

    if (findUser?.length === 0) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    return findUser;
  }

  public async getAllPortfolios(userId: number): Promise<object[] | undefined> {
    const projectsRepository = getRepository(Project);

    const findProject = await projectsRepository.find({
      where: { partnerId: userId },
      loadEagerRelations: true,
    });

    if (findProject?.length === 0) {
      throw new AppError('Nenhum registro foi encontrado.');
    }
    const data: object[] = [];

    findProject.forEach(async item => {
      const entrepreneurContent = {
        entrepreneurName: `${item.entrepreneur.firstName} ${item.entrepreneur.lastName}`,
        signupDate: item.entrepreneur.createdAt,
        projectName: item.name,
        status: item.state,
        amountRequested: item.goal,
        amountCaptured: item.raised,
        amountReceived: item.raised,
        percentageFee: item.percentageFee,
        installments: item.installmentsPrediction,
        state: 'Em dia', // valor muda em função da data
      };

      data.push(entrepreneurContent);
    });

    return data;
  }
}

export default GetEntrepreneurPortfolioService;
