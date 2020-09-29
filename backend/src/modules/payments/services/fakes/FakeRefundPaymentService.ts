/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import ICreateBankStatementDTO from '@modules/users/dtos/IEntrepreneurBankStatementDTO';

import EntrepreneurBankStatement from '@modules/users/infra/typeorm/entities/EntrepreneurBankStatement';
import IRefundPaymentsRepository from '../../repositories/fakes/FakeRefundPaymentRepository';

interface IRequestProject {
  name: string;
  dateLimit: Date;
  description: string;
  goal: string;
  location: string;
  category: string;
  videoUrl: string;
  pageContent: string;
  moipAccountId: string;
  moipToken: string;
  partnerId: number;
  entrepreneurId: number;
  raised: string;
  paidback: string;
  totalToPayback: string;
  state: string;
  paymentState: string;
  withdrawn: string;
  installmentsPrediction: number;
  percentageFee: string;
  firgunAnalisys: boolean;
  businessTime: string;
}

@injectable()
class FakeRefundPaymentService {
  constructor(
    @inject('RefundPaymentRepository')
    private paymentsRepository: IRefundPaymentsRepository,
  ) {}

  public async createProject({
    name,
    category,
    dateLimit,
    description,
    goal,
    location,
    pageContent,
    videoUrl,
    entrepreneurId,
    installmentsPrediction,
    moipAccountId,
    moipToken,
    paidback,
    partnerId,
    paymentState,
    percentageFee,
    raised,
    state,
    totalToPayback,
    withdrawn,
    firgunAnalisys,
    businessTime,
  }: IRequestProject): Promise<Project> {
    const project = await this.paymentsRepository.createProject({
      name,
      category,
      dateLimit,
      description,
      goal,
      location,
      pageContent,
      videoUrl,
      entrepreneurId,
      installmentsPrediction,
      moipAccountId,
      moipToken,
      paidback,
      partnerId,
      paymentState,
      percentageFee,
      raised,
      state,
      totalToPayback,
      withdrawn,
      firgunAnalisys,
      businessTime,
    });

    return project;
  }

  public async createBankStatement({
    amount,
    dueDate,
    installment,
    projectId,
    projectName,
    state,
    status,
    userId,
  }: ICreateBankStatementDTO): Promise<EntrepreneurBankStatement> {
    const bankStatement = await this.paymentsRepository.createBankStatement({
      amount,
      dueDate,
      installment,
      projectId,
      projectName,
      state,
      status,
      userId,
    });

    return bankStatement;
  }
}

export default FakeRefundPaymentService;
