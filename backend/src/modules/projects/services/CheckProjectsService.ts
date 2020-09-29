import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class CheckProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(entrepreneurId: number): Promise<Project | undefined> {
    const findUser = await this.projectsRepository.findUser(entrepreneurId);

    if (!findUser) {
      throw new AppError('Usuário não encontrado');
    }

    if (findUser.role !== 'ENTREPRENEUR') {
      throw new AppError(
        'Você não está habilitado para criar um projeto, por favor habilite o seu perfil de empreendedor',
      );
    }

    if (findUser.partnerConfirmed === false) {
      throw new AppError(
        'O parceiro que você indicou ainda não confirmou a sua solicitação',
      );
    }

    const findProjectInProgress = await this.projectsRepository.findByStatus(
      'CATCHING',
      'NOT_REFUNDED',
      entrepreneurId,
    );

    if (findProjectInProgress) {
      throw new AppError(
        'Você ainda não está habilitado para criar um novo projeto',
      );
    }

    return findProjectInProgress;
  }
}

export default CheckProjectService;
