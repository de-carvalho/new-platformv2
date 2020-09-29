import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminFirgunTeam from '@modules/users/infra/typeorm/entities/AdminFirgunTeam';
import IAdminFirgunTeamRepository from '@modules/users/repositories/IAdminFirgunTeamRepository';

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  cellPhoneNumber: string;
  cpfNumber: string;
  occupation: string;
  linkedin: string;
  avatar?: string;
  userId: number;
}

@injectable()
class AdminFirgunTeamService {
  constructor(
    @inject('AdminFirgunTeamRepository')
    private adminFirgunTeam: IAdminFirgunTeamRepository,
  ) {}

  public async execute({
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    cpfNumber,
    occupation,
    linkedin,
    avatar,
    userId,
  }: IRequest): Promise<AdminFirgunTeam> {
    const findUser = await this.adminFirgunTeam.findUserByEmail(email);

    if (findUser) {
      throw new AppError('Este email já foi cadastrado.');
    }

    const findLoggedUser = await this.adminFirgunTeam.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const team = await this.adminFirgunTeam.create({
      firstName,
      lastName,
      email,
      cellPhoneNumber,
      cpfNumber,
      occupation,
      linkedin,
      avatar,
    });

    return team;
  }
}

export default AdminFirgunTeamService;
