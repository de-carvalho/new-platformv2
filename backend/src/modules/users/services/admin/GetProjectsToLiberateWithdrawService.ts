import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  userId: number;
}

@injectable()
class LiberateWithdrawService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<Project[]> {
    const findProjects = await this.projectsRepository.getProjectsToLiberateWithdraw();

    if (!findProjects || findProjects.length === 0) {
      throw new AppError('Nenhum projeto foi encontrado');
    }

    const findUser = await this.projectsRepository.findUser(userId);

    if (!findUser || findUser?.role !== 'ADMIN') {
      throw new AppError('Você não está habilitado para completar a operação.');
    }

    return findProjects;
  }
}

export default LiberateWithdrawService;
