/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IBalanceRepository from '../../repositories/fakes/FakeProjectBalanceRepository';

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
class FakeProjectBalanceService {
  constructor(
    @inject('ProjectBalanceRepository')
    private balanceRepository: IBalanceRepository,
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
    const project = await this.balanceRepository.createProject({
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
}

export default FakeProjectBalanceService;
