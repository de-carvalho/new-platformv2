import User from '@modules/users/infra/typeorm/entities/User';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import AdminDocumentsToEntrepreneur from '../infra/typeorm/entities/AdminDocumentsToEntrepreneur';

interface IDocs {
  contract: string;
  userId: number;
  projectId: number;
}
export default interface IAdminCheckProjectsRepository {
  create(datas: IDocs): Promise<AdminDocumentsToEntrepreneur>;
  save(
    user: AdminDocumentsToEntrepreneur,
  ): Promise<AdminDocumentsToEntrepreneur>;
  getUserData(
    userId: number,
    projectId: number,
  ): Promise<AdminDocumentsToEntrepreneur | undefined>;
  findUser(
    userId: number,
    projectId: number,
  ): Promise<AdminDocumentsToEntrepreneur | undefined>;
  findUserById(userId: number): Promise<User | undefined>;
  findProject(projectId: number): Promise<Project | undefined>;
}
