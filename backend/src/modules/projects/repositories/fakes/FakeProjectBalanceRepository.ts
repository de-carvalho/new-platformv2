import IBalanceRepository from '@modules/projects/repositories/IProjectBalanceRepository';
import IProjectBalanceDTO from '@modules/projects/dtos/IProjectBalanceDTO';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import Balance from '../../infra/typeorm/entities/ProjectBalance';
import Project from '../../infra/typeorm/entities/Project';

class FakeBalanceRepository implements IBalanceRepository {
  private ormRepository: Balance[] = [];

  private projectsRepository: Project[] = [];

  public async findById(projectId: number): Promise<Balance | undefined> {
    const findUserBalance = this.ormRepository.find(
      item => item.projectId === projectId,
    );

    return findUserBalance;
  }

  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProject = this.projectsRepository.find(
      item => item.id === projectId,
    );

    return findProject;
  }

  public async createProject(data: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(project, { id }, data);

    this.projectsRepository.push(project);

    return project;
  }

  public async create(data: IProjectBalanceDTO): Promise<Balance> {
    const balance = new Balance();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(balance, { id }, data);

    this.ormRepository.push(balance);

    return balance;
  }

  public async update(data: Balance): Promise<Balance> {
    this.ormRepository.push(data);

    return data;
  }
}

export default FakeBalanceRepository;
