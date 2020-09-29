import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class GetProjectsCompletedService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(): Promise<Project[] | undefined> {
    // Busca todos os projetos que estão completos
    const findProjects = await this.projectsRepository.getProjectsCompleted(
      'COMPLETED',
    );

    if (findProjects?.length === 0) {
      throw new AppError('Nenhum projeto foi encontrado');
    }

    return findProjects;
  }
}

export default GetProjectsCompletedService;
