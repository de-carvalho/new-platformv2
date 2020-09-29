import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import ProjectSupporter from '../infra/typeorm/entities/ProjectSupporter';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class GetProjectSupporters {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(
    projectId: number,
  ): Promise<ProjectSupporter[] | undefined> {
    const investors = await this.projectsRepository.getProjectSupporters(
      projectId,
    );

    if (investors?.length === 0) {
      throw new AppError('Nenhum investidor foi encontrado');
    }

    return investors;
  }
}

export default GetProjectSupporters;
