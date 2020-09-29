import User from '@modules/users/infra/typeorm/entities/User';
import Project from '../infra/typeorm/entities/Project';
import ProjectSupporter from '../infra/typeorm/entities/ProjectSupporter';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import IProjectSupportDTO from '../dtos/IProjectSupportersDTO';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  save(data: Project): Promise<Project>;
  findByStatus(
    state: string,
    paymentState: string,
    entrepreneurId: number,
  ): Promise<Project | undefined>;
  findByPaymentState(entrepreneurId: number): Promise<Project | undefined>;
  cancel(project: Project, projectId: number): Promise<Project>;
  findById(id: number): Promise<Project | undefined>;
  addSupporterToProject(data: IProjectSupportDTO): Promise<ProjectSupporter>;
  getAndUpdate(data: ProjectSupporter): Promise<ProjectSupporter>;
  findSupporterById(
    userId: number,
    projectId: number,
  ): Promise<ProjectSupporter | undefined>;
  getProjectsInProgress(): Promise<Project[] | undefined>;
  getProjectsCompleted(state: string): Promise<Project[] | undefined>;
  getProjectsToLiberateWithdraw(): Promise<Project[] | undefined>;
  getUserProjectsInProgress(
    entrepreneurId: number,
  ): Promise<Project | undefined>;
  getUserProjectsCompleted(
    state: string,
    entrepreneurId: number,
  ): Promise<Project[] | undefined>;
  getProjectSupporters(projectId: number): Promise<ProjectSupporter[]>;
  getPausedProjects(state: string): Promise<Project[] | undefined>;
  getFirgunProjects(
    projectType: number,
    state: string,
  ): Promise<Project[] | undefined>;
  findUser(userId: number): Promise<User | undefined>;
}
