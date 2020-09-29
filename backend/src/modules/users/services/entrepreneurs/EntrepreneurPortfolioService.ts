import { injectable, inject } from 'tsyringe';

import IEntrepreneurPortfolioRepository from '@modules/users/repositories/IEntrepreneurPortfolioRepository';
import EntrepreneurPortfolio from '../../infra/typeorm/entities/EntrepreneurPortfolio';

interface IRequest {
  requestedAmount: string;
  userId: number;
  amountCaptured: string;
  installment: number;
  percentageFee: string;
  status: string;
  userName: string;
  signupDate: Date;
  receiptDate: Date;
  state: string;
  projectName: string;
  projectId: number;
  partnerId: number;
}

@injectable()
class EntrepreneurPortfolioService {
  constructor(
    @inject('EntrepreneurPortfolioRepository')
    private entrepreneursRepository: IEntrepreneurPortfolioRepository,
  ) {}

  public async execute({
    userId,
    userName,
    projectId,
    projectName,
    amountCaptured,
    requestedAmount,
    percentageFee,
    installment,
    signupDate,
    receiptDate,
    status,
    state,
    partnerId,
  }: IRequest): Promise<EntrepreneurPortfolio> {
    const userPortfolio = await this.entrepreneursRepository.create({
      userId,
      userName,
      projectId,
      projectName,
      amountCaptured,
      requestedAmount,
      percentageFee,
      installment,
      signupDate,
      status,
      state,
      partnerId,
      receiptDate,
    });

    return userPortfolio;
  }
}

export default EntrepreneurPortfolioService;
