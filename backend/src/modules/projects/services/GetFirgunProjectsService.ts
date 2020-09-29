import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class GetProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(): Promise<Project[] | undefined> {
    const findProjects = await this.projectsRepository.getFirgunProjects(
      2,
      'COMPLETED',
    );

    if (findProjects?.length === 0) {
      throw new AppError('Nenhum projeto foi encontrado');
    }

    return findProjects;
  }
}

export default GetProjectsService;
