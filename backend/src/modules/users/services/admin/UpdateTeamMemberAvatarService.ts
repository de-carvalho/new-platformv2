import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminFirgunTeam from '@modules/users/infra/typeorm/entities/AdminFirgunTeam';
import IAdminFirgunTeamRepository from '@modules/users/repositories/IAdminFirgunTeamRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  avatar: string;
  userId: number;
}

@injectable()
class UpdateTeamMemberAvatarService {
  constructor(
    @inject('AdminFirgunTeamRepository')
    private adminFirgunTeam: IAdminFirgunTeamRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({ avatar, userId }: IRequest): Promise<AdminFirgunTeam> {
    const findLoggedUser = await this.adminFirgunTeam.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const findUser = await this.adminFirgunTeam.findUser(userId);

    if (!findUser) {
      throw new AppError('Usuário não encontrado');
    }

    if (findUser.avatar) {
      await this.storageProvider.deleteAdminTeamFile(findUser.avatar);
    }

    const filename = await this.storageProvider.saveAdminTeamFile(avatar);

    findUser.avatar = filename;

    await this.adminFirgunTeam.save(findUser);

    return findUser;
  }
}

export default UpdateTeamMemberAvatarService;
