import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import IBalanceRepository from '../repositories/IProjectBalanceRepository';
import Project from '../infra/typeorm/entities/Project';

@injectable()
class CheckProjectForBalanceService {
  constructor(
    @inject('ProjectBalanceRepository')
    private balanceRepository: IBalanceRepository,
  ) {}

  public async execute(
    userId: number,
    projectId: number,
  ): Promise<Project | undefined> {
    const findProject = await this.balanceRepository.findProject(projectId);

    if (!findProject || findProject.entrepreneurId !== userId) {
      throw new AppError(
        'O projeto não foi encontrado ou você não está habilitado para completar a operação',
      );
    }

    return findProject;
  }
}

export default CheckProjectForBalanceService;
