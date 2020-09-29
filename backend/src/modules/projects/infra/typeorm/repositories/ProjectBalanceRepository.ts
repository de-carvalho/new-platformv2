import { getRepository, Repository } from 'typeorm';

import IBalanceRepository from '@modules/projects/repositories/IProjectBalanceRepository';
import IProjectBalanceDTO from '@modules/projects/dtos/IProjectBalanceDTO';
import Project from '../entities/Project';
import Balance from '../entities/ProjectBalance';

class BalanceRepository implements IBalanceRepository {
  private ormRepository: Repository<Balance>;

  private projectsRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Balance);
    this.projectsRepository = getRepository(Project);
  }

  public async findById(projectId: number): Promise<Balance | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { projectId },
    });

    return findUser;
  }

  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProject = await this.projectsRepository.findOne(projectId);

    return findProject;
  }

  public async create(data: IProjectBalanceDTO): Promise<Balance> {
    const balance = this.ormRepository.create(data);

    await this.ormRepository.save(balance);

    return balance;
  }

  public async update(data: Balance): Promise<Balance> {
    return this.ormRepository.save(data);
  }
}

export default BalanceRepository;
