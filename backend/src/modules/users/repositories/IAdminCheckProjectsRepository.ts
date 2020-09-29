import IAdminCheckProjectsDTO from '@modules/users/dtos/IAdminCheckProjectsDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import AdminCheckProjects from '../infra/typeorm/entities/AdminCheckProjects';

export default interface IAdminCheckProjectsRepository {
  create(datas: IAdminCheckProjectsDTO): Promise<AdminCheckProjects>;
  save(user: AdminCheckProjects): Promise<AdminCheckProjects>;
  getUserData(
    userId: number,
    projectId: number,
  ): Promise<AdminCheckProjects | undefined>;
  getDatas(): Promise<AdminCheckProjects[] | undefined>;
  getProjectAnalised(
    userId: number,
    projectId: number,
  ): Promise<AdminCheckProjects[] | undefined>;
  findUser(
    userId: number,
    projectId: number,
  ): Promise<AdminCheckProjects | undefined>;
  findProjectByType(
    userId: number,
    projectId: number,
    projectType: number,
  ): Promise<AdminCheckProjects | undefined>;
  findUserById(userId: number): Promise<User | undefined>;
  findProject(projectId: number): Promise<Project | undefined>;
  saveProject(project: Project): Promise<Project>;
}
