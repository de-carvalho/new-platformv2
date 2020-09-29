import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminFirgunTeam from '@modules/users/infra/typeorm/entities/AdminFirgunTeam';
import IAdminFirgunTeamRepository from '@modules/users/repositories/IAdminFirgunTeamRepository';

@injectable()
class AdminFirgunTeamService {
  constructor(
    @inject('AdminFirgunTeamRepository')
    private adminFirgunTeam: IAdminFirgunTeamRepository,
  ) {}

  public async execute(): Promise<AdminFirgunTeam[]> {
    const team = await this.adminFirgunTeam.getTeam();

    if (team.length === 0) {
      throw new AppError('Nenhum membro foi encontrado.');
    }

    return team;
  }
}

export default AdminFirgunTeamService;
