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
  userId: number;
  memberId: number;
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
    userId,
    memberId,
  }: IRequest): Promise<AdminFirgunTeam> {
    const findUser = await this.adminFirgunTeam.findUser(memberId);

    if (!findUser) {
      throw new AppError('Membro do team não cadastrado.');
    }

    const findLoggedUser = await this.adminFirgunTeam.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    findUser.firstName = firstName;
    findUser.lastName = lastName;
    findUser.email = email;
    findUser.cpfNumber = cpfNumber;
    findUser.cellPhoneNumber = cellPhoneNumber;
    findUser.occupation = occupation;
    findUser.linkedin = linkedin;

    const teamMember = await this.adminFirgunTeam.save(findUser);

    return teamMember;
  }
}

export default AdminFirgunTeamService;
