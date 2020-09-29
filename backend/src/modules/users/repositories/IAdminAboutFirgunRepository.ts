import IAdminAboutFirgunDTO from '@modules/users/dtos/IAdminAboutFirgunDTO';
import AdminAboutFirgun from '@modules/users/infra/typeorm/entities/AdminAboutFirgun';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IAdminCheckProjectsRepository {
  create(data: IAdminAboutFirgunDTO): Promise<AdminAboutFirgun>;
  save(user: AdminAboutFirgun): Promise<AdminAboutFirgun>;
  getData(): Promise<AdminAboutFirgun | undefined>;
  findLoggedUser(userId: number): Promise<User | undefined>;
}
