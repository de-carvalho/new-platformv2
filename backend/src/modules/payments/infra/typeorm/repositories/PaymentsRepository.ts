import { getRepository, Repository } from 'typeorm';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import ProjectSupporter from '@modules/projects/infra/typeorm/entities/ProjectSupporter';

import Payment from '../entities/Payment';

class PaymentsRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  private projectRepository: Repository<Project>;

  private projectSupporterRepository: Repository<ProjectSupporter>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Payment);
    this.projectRepository = getRepository(Project);
    this.projectSupporterRepository = getRepository(ProjectSupporter);
    this.usersRepository = getRepository(User);
  }

  // Procura o projeto no banco de dados pelo id do projeto
  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProjectExistence = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    return findProjectExistence;
  }

  public async findUser(userId: number): Promise<User | undefined> {
    const findUser = await this.usersRepository.findOne(userId);

    return findUser;
  }

  // Cria o pagamento/investimento no projeto
  public async create(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.ormRepository.create(data);

    await this.ormRepository.save(payment);

    return payment;
  }

  // Atualiza os dados do projeto depois do investimento ter sido feito
  // dados como: Raised
  public async updateProject(data: Project): Promise<Project> {
    return this.projectRepository.save(data);
  }
}

export default PaymentsRepository;
