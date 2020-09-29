import { getRepository, Repository } from 'typeorm';

import ITransfersRepository from '@modules/payments/repositories/ITransfersRepository';
import ICreateTransfersDTO from '@modules/payments/dtos/ICreateTransfersDTO';

import ProjectBalance from '@modules/projects/infra/typeorm/entities/ProjectBalance';
import User from '@modules/users/infra/typeorm/entities/User';
import Balance from '@modules/balance/infra/typeorm/entities/Balance';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import Transfers from '../entities/Transfers';

class TransfersRepository implements ITransfersRepository {
  private ormRepository: Repository<Transfers>;

  private usersRepository: Repository<User>;

  private projectRepository: Repository<Project>;

  private balanceRepository: Repository<Balance>;

  private projectBalanceRepository: Repository<ProjectBalance>;

  constructor() {
    this.ormRepository = getRepository(Transfers);
    this.usersRepository = getRepository(User);
    this.projectRepository = getRepository(Project);
    this.balanceRepository = getRepository(Balance);
    this.projectBalanceRepository = getRepository(ProjectBalance);
  }

  public async checkUserBalance(userId: number): Promise<Balance | undefined> {
    const findUserBalance = await this.balanceRepository.findOne({
      where: { userId },
    });

    return findUserBalance;
  }

  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProject = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    return findProject;
  }

  public async checkProjectBalance(
    projectId: number,
  ): Promise<ProjectBalance | undefined> {
    const findProjectBalance = await this.projectBalanceRepository.findOne({
      where: { projectId },
    });

    return findProjectBalance;
  }

  public async findUser(
    taxDocumentNumber: string,
    email: string,
  ): Promise<User | undefined> {
    const findUserExistence = await this.usersRepository.findOne({
      where: {
        taxDocumentNumber,
        email,
      },
    });

    return findUserExistence;
  }

  public async findUserById(id: number): Promise<User | undefined> {
    const findUser = await this.usersRepository.findOne(id);

    return findUser;
  }

  public async create(data: ICreateTransfersDTO): Promise<Transfers> {
    const transfers = this.ormRepository.create(data);

    await this.ormRepository.save(transfers);

    return transfers;
  }
}

export default TransfersRepository;
