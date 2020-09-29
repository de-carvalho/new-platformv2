import ITransfersRepository from '@modules/payments/repositories/ITransfersRepository';
import ICreateTransfersDTO from '@modules/payments/dtos/ICreateTransfersDTO';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import IProjectBalanceDTO from '@modules/projects/dtos/IProjectBalanceDTO';
import ProjectBalance from '@modules/projects/infra/typeorm/entities/ProjectBalance';
import User from '@modules/users/infra/typeorm/entities/User';
import Balance from '@modules/balance/infra/typeorm/entities/Balance';
import IGetAccountBalanceDTO from '@modules/balance/dtos/IGetAccountBalanceDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import Transfers from '../../infra/typeorm/entities/Transfers';

class FakeTransfersRepository implements ITransfersRepository {
  private ormRepository: Transfers[] = [];

  private usersRepository: User[] = [];

  private projectRepository: Project[] = [];

  private balanceRepository: Balance[] = [];

  private projectBalanceRepository: ProjectBalance[] = [];

  public async checkUserBalance(userId: number): Promise<Balance | undefined> {
    const findUserBalance = this.balanceRepository.find(
      item => item.userId === userId,
    );

    return findUserBalance;
  }

  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProject = this.projectRepository.find(
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

    this.projectRepository.push(project);

    return project;
  }

  public async createUserBalance(
    data: IGetAccountBalanceDTO,
  ): Promise<Balance> {
    const balance = new Balance();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(balance, { id }, data);

    this.balanceRepository.push(balance);

    return balance;
  }

  public async updateUserBalance(data: Balance): Promise<Balance> {
    this.balanceRepository.push(data);

    return data;
  }

  public async checkProjectBalance(
    projectId: number,
  ): Promise<ProjectBalance | undefined> {
    const findProjectBalance = this.projectBalanceRepository.find(
      item => item.projectId === projectId,
    );

    return findProjectBalance;
  }

  public async createProjectBalance(
    data: IProjectBalanceDTO,
  ): Promise<ProjectBalance> {
    const balance = new ProjectBalance();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(balance, { id }, data);

    this.projectBalanceRepository.push(balance);

    return balance;
  }

  public async findUser(
    taxDocumentNumber: string,
    email: string,
  ): Promise<User | undefined> {
    const findUserExistence = this.usersRepository.find(
      item =>
        item.email === email && item.taxDocumentNumber === taxDocumentNumber,
    );

    return findUserExistence;
  }

  public async findUserById(id: number): Promise<User | undefined> {
    const findUser = this.usersRepository.find(item => item.id === id);

    return findUser;
  }

  public async createUser(userData: ICreateUserPFDTO): Promise<User> {
    const user = new User();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);

    Object.assign(user, { id }, userData);

    this.usersRepository.push(user);

    return user;
  }

  public async create(data: ICreateTransfersDTO): Promise<Transfers> {
    const transfers = new Transfers();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(transfers, { id }, data);

    this.ormRepository.push(transfers);

    return transfers;
  }
}

export default FakeTransfersRepository;
