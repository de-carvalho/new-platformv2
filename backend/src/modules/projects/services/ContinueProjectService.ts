import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  projectId: number;
  userId: number;
}

@injectable()
class ContinueProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ projectId, userId }: IRequest): Promise<Project> {
    const findProject = await this.projectsRepository.findById(projectId);

    if (!findProject) {
      throw new AppError('Projeto não encontrado');
    }

    const findUser = await this.projectsRepository.findUser(userId);

    if (findProject.entrepreneurId !== userId && findUser?.role !== 'ADMIN') {
      throw new AppError('Você não está habilitado para continuar o projeto.');
    }

    findProject.state = 'CATCHING';
    findProject.paymentState = 'NOT_REFUNDED';

    const project = await this.projectsRepository.save(findProject);

    return project;
  }
}

export default ContinueProjectService;
