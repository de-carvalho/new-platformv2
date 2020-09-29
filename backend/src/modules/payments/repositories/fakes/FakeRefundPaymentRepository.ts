/* eslint-disable radix */
import IRefundPaymentsRepository from '@modules/payments/repositories/IRefundPaymentRepository';
import IRefundPaymentDTO from '@modules/payments/dtos/ICreateRefundDTO';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import ICreateBankStatementDTO from '@modules/users/dtos/IEntrepreneurBankStatementDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import EntrepreneurBankStatement from '@modules/users/infra/typeorm/entities/EntrepreneurBankStatement';

import RefundPayment from '../../infra/typeorm/entities/RefundPayment';

class RefundPaymentsRepository implements IRefundPaymentsRepository {
  private ormRepository: RefundPayment[] = [];

  private projectRepository: Project[] = [];

  private bankStatementRepository: EntrepreneurBankStatement[] = [];

  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProjectExistence = this.projectRepository.find(
      item => item.id === projectId,
    );

    return findProjectExistence;
  }

  public async findProjectStatement(
    userId: number,
    projectId: number,
    installment: number,
  ): Promise<EntrepreneurBankStatement | undefined> {
    const findProjectStatement = this.bankStatementRepository.find(
      item =>
        item.userId === userId &&
        item.projectId === projectId &&
        item.installment === installment,
    );

    return findProjectStatement;
  }

  public async create(data: IRefundPaymentDTO): Promise<RefundPayment> {
    const payment = new RefundPayment();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);

    Object.assign(payment, { id }, data);

    this.ormRepository.push(payment);

    return payment;
  }

  public async createBankStatement(
    data: ICreateBankStatementDTO,
  ): Promise<EntrepreneurBankStatement> {
    const bankStatement = new EntrepreneurBankStatement();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);

    Object.assign(bankStatement, { id }, data);

    this.bankStatementRepository.push(bankStatement);

    return bankStatement;
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
}

export default RefundPaymentsRepository;
