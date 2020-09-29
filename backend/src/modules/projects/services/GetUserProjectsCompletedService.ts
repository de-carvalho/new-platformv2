import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '@shared/errors/AppErrors';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class GetUserProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(entrepreneurId: number): Promise<Project[] | undefined> {
    // Busca todos os projetos que estão concluidos
    const findProject = await this.projectsRepository.getUserProjectsCompleted(
      'COMPLETED',
      entrepreneurId,
    );

    if (findProject?.length === 0 || !findProject) {
      throw new AppError('Nenhum projeto completo foi encontrado');
    }

    // eslint-disable-next-line no-unused-expressions
    findProject.forEach(project => format(project.createdAt, 'dd/MM/yyyy'));

    return findProject;
  }
}

export default GetUserProjectService;
