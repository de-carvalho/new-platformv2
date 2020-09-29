import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

interface IRequest {
  userId: number;
}

@injectable()
class GetProjectsNotRefundedService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Project | undefined> {
    const findUser = await this.projectsRepository.findUser(userId);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.');
    }

    const project = await this.projectsRepository.findByPaymentState(userId);

    if (!project) {
      throw new AppError('Projeto não encontrado.');
    }
    return project;
  }
}

export default GetProjectsNotRefundedService;
