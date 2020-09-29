import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class GetUserProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(entrepreneurId: number): Promise<Project | undefined> {
    // Busca todos os projetos que estão em andamento
    const findProject = await this.projectsRepository.getUserProjectsInProgress(
      entrepreneurId,
    );

    if (!findProject) {
      throw new AppError('Nenhum projeto em andamento foi encontrado');
    }

    return findProject;
  }
}

export default GetUserProjectService;
