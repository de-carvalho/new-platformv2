import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  projectId: number;
  userId: number;
}

@injectable()
class CancelProjectService {
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
      throw new AppError('Você não está habilitado para cancelar o projeto.');
    }

    findProject.state = 'CANCELED';
    findProject.paymentState = 'CANCELED';

    if (Number(findProject.raised) >= 0) {
      findProject.paymentState = 'REFUNDED';
    }

    const project = await this.projectsRepository.cancel(
      findProject,
      findProject.id,
    );

    return project;
  }
}

export default CancelProjectService;
