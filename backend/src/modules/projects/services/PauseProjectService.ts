import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  projectId: number;
  userId: number;
}

@injectable()
class PauseProjectService {
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
      throw new AppError('Você não está habilitado para pausar o projeto.');
    }

    if (findProject.state === 'COMPLETED') {
      throw new AppError('O projeto está completo e não poder ser pausado');
    }

    findProject.state = 'PAUSED';
    findProject.paymentState = 'PAUSED';

    const project = await this.projectsRepository.save(findProject);

    return project;
  }
}

export default PauseProjectService;
