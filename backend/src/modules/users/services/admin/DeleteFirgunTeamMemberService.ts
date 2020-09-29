import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IAdminFirgunTeamRepository from '@modules/users/repositories/IAdminFirgunTeamRepository';

interface IRequest {
  memberId: number;
  userId: number;
}

@injectable()
class DeleteFirgunTeamMamberService {
  constructor(
    @inject('AdminFirgunTeamRepository')
    private adminFirgunTeam: IAdminFirgunTeamRepository,
  ) {}

  public async execute({ memberId, userId }: IRequest): Promise<void> {
    const findUser = await this.adminFirgunTeam.findUser(memberId);

    if (!findUser) {
      throw new AppError('Membro de team não encontrado');
    }

    const findLoggedUser = await this.adminFirgunTeam.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    await this.adminFirgunTeam.delete(memberId);
  }
}

export default DeleteFirgunTeamMamberService;
