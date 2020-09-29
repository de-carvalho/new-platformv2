import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import User from '@modules/users/infra/typeorm/entities/User';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';

@injectable()
class CheckUserService {
  constructor(
    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,
  ) {}

  public async execute(
    userId: number,
    projectId: number,
  ): Promise<User | undefined> {
    const findUserById = await this.adminCheckProjects.findUserById(userId);

    const findUser = await this.adminCheckProjects.findUser(userId, projectId);

    const findProject = await this.adminCheckProjects.findProject(projectId);

    if (!findProject) {
      throw new AppError('Projeto não foi encontrado.');
    }

    if (!findUserById) {
      throw new AppError('O usuário não foi encontrado');
    }

    if (findProject.entrepreneurId !== userId) {
      throw new AppError('Você não está habilitado para confirmar o contrato');
    }

    if (findUserById.role !== 'ENTREPRENEUR') {
      throw new AppError('O usuário não habilitado para completar a operação');
    }

    if (!findUser) {
      throw new AppError('Nenhuma solicitação de contrato foi encontrada.');
    }

    if (!findUser.entrepreneurDocsId) {
      throw new AppError('Você ainda não enviou os documentos');
    }

    if (findUser.firgunAnalysis === false) {
      throw new AppError('Seu projeto foi negado.');
    }

    if (findUser.firgunAnalysis === null) {
      throw new AppError('Seu projeto ainda não foi analisado.');
    }

    if (findUser.confirmedByEntrepreneur) {
      throw new AppError('Você já confirmou a opção de empréstimo');
    }

    if (findUserById.bankNumber === null) {
      throw new AppError(
        'Número do banco não foi informado, confirme seus dados bancários',
      );
    }
    if (findUserById.bankAccountNumber === null) {
      throw new AppError(
        'Número da conta bancária não foi informado, confirme seus dados bancários',
      );
    }
    if (findUserById.bankAgencyNumber === null) {
      throw new AppError(
        'Número da agência não foi informado, confirme seus dados bancários',
      );
    }
    if (findUserById.bankAccountType === null) {
      throw new AppError(
        'Tipo de conta bancária não foi informado, confirme seus dados bancários',
      );
    }

    return findUserById;
  }
}

export default CheckUserService;
