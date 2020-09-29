import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppErrors';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  projectId: number;
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

  public async execute({ projectId, userId }: IRequest): Promise<Project> {
    const findProject = await this.projectsRepository.findById(projectId);

    if (!findProject) {
      throw new AppError('Projeto não encontrado');
    }

    const findUser = await this.projectsRepository.findUser(userId);

    if (!findUser || findUser?.role !== 'ADMIN') {
      throw new AppError('Você não está habilitado para completar a operação.');
    }

    if (findProject.releasedForWithdrawal === true) {
      throw new AppError('O projeto já foi liberado para saque');
    }

    findProject.state = 'COMPLETED';
    findProject.releasedForWithdrawal = true;

    const project = await this.projectsRepository.save(findProject);

    const findEntrepreneur = await this.projectsRepository.findUser(
      findProject.entrepreneurId,
    );

    if (findEntrepreneur) {
      const withdrawLiberatedTemplate = path.resolve(
        __dirname,
        '..',
        '..',
        'views',
        'withdrawLiberated.hbs',
      );

      await this.mailProvider.sendMail({
        to: {
          name: findEntrepreneur.firstName,
          email: findEntrepreneur.email,
        },
        subject: '[Firgun] Saque liberado',
        templateData: {
          file: withdrawLiberatedTemplate,
          variables: {
            name: findEntrepreneur.firstName,
            project: project.name,
          },
        },
      });
    }

    return project;
  }
}

export default LiberateWithdrawService;
