/* eslint-disable radix */
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import Payment from '../../infra/typeorm/entities/Payment';

class PaymentsRepository implements IPaymentsRepository {
  private ormRepository: Payment[] = [];

  private projectRepository: Project[] = [];

  private usersRepository: User[] = [];

  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProjectExistence = this.projectRepository.find(
      item => item.id === projectId,
    );

    return findProjectExistence;
  }

  public async findUser(userId: number): Promise<User | undefined> {
    const findUser = this.usersRepository.find(item => item.id === userId);

    return findUser;
  }

  public async create(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);

    Object.assign(payment, { id }, data);

    this.ormRepository.push(payment);

    return payment;
  }

  public async updateProject(data: Project): Promise<Project> {
    this.projectRepository.push(data);

    return data;
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
}

export default PaymentsRepository;
