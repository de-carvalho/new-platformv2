import { getRepository, Repository } from 'typeorm';

import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';
import IAdminCheckProjectDTO from '@modules/users/dtos/IAdminCheckProjectsDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import AdminCheckProject from '../../entities/AdminCheckProjects';

class AdminCheckProjectsRepository implements IAdminCheckProjectsRepository {
  private ormRepository: Repository<AdminCheckProject>;

  private projectRepository: Repository<Project>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(AdminCheckProject);
    this.projectRepository = getRepository(Project);
    this.usersRepository = getRepository(User);
  }

  public async findUser(
    userId: number,
    projectId: number,
  ): Promise<AdminCheckProject | undefined> {
    const user = await this.ormRepository.findOne({
      where: { userId, projectId },
    });

    return user;
  }

  public async findProjectByType(
    userId: number,
    projectId: number,
    projectType: number,
  ): Promise<AdminCheckProject | undefined> {
    const user = await this.ormRepository.findOne({
      where: { userId, projectId, projectType },
    });

    return user;
  }

  public async findUserById(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return user;
  }

  public async findProject(projectId: number): Promise<Project | undefined> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    return project;
  }

  public async getUserData(
    userId: number,
    projectId: number,
  ): Promise<AdminCheckProject | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId, projectId },
    });

    return userData;
  }

  public async getDatas(): Promise<AdminCheckProject[] | undefined> {
    const datas = await this.ormRepository.find({
      relations: ['entrepreneur', 'project', 'documents'],
    });

    return datas;
  }

  public async getProjectAnalised(
    userId: number,
    projectId: number,
  ): Promise<AdminCheckProject[] | undefined> {
    const datas = await this.ormRepository.find({
      entrepreneurId: userId,
      projectId,
      firgunAnalysis: true,
      projectState: 'CATCHING',
    });

    return datas;
  }

  public async create(
    userData: IAdminCheckProjectDTO,
  ): Promise<AdminCheckProject> {
    const data = this.ormRepository.create(userData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(user: AdminCheckProject): Promise<AdminCheckProject> {
    const updatedData = this.ormRepository.save(user);

    return updatedData;
  }

  public async saveProject(project: Project): Promise<Project> {
    const projectUpdated = this.projectRepository.save(project);

    return projectUpdated;
  }
}

export default AdminCheckProjectsRepository;
