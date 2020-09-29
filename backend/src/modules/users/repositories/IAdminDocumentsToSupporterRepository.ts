import IAdminDocumentsToSupporterDTO from '@modules/users/dtos/IAdminDocumentsToSupporterDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import AdminDocumentsToSupporter from '../infra/typeorm/entities/AdminDocumentsToSupporter';

export default interface IAdminCheckProjectsRepository {
  create(
    datas: IAdminDocumentsToSupporterDTO,
  ): Promise<AdminDocumentsToSupporter>;
  save(user: AdminDocumentsToSupporter): Promise<AdminDocumentsToSupporter>;
  getUserData(userId: number): Promise<AdminDocumentsToSupporter | undefined>;
  findUser(userId: number): Promise<AdminDocumentsToSupporter | undefined>;
  findUserById(userId: number): Promise<User | undefined>;
}
