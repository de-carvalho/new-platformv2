import IAdminFirgunTeamDTO from '@modules/users/dtos/IAdminFirgunTeamDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import AdminFirgunTeam from '../infra/typeorm/entities/AdminFirgunTeam';

export default interface IAdminCheckProjectsRepository {
  create(datas: IAdminFirgunTeamDTO): Promise<AdminFirgunTeam>;
  save(user: AdminFirgunTeam): Promise<AdminFirgunTeam>;
  findUser(userId: number): Promise<AdminFirgunTeam | undefined>;
  getTeam(): Promise<AdminFirgunTeam[]>;
  findUserByEmail(email: string): Promise<AdminFirgunTeam | undefined>;
  delete(memberId: number): Promise<void>;
  findLoggedUser(userId: number): Promise<User | undefined>;
}
