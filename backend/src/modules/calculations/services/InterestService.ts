import { injectable, inject } from 'tsyringe';

import InterestRepository from '@modules/calculations/repositories/InterestRepository';

interface IRequest {
  interest: string;
  times: number;
  amount: string;
}

interface IResponse {
  installmentAmount: string;
  monthlyInterest: string;
  amountToPayBack: string;
  partnerAmountTotal: string;
  firgunAmountTotal: string;
}

@injectable()
class InterestService {
  constructor(
    @inject('InterestRepository')
    private interest: InterestRepository,
  ) {}

  public async execute({
    interest,
    times,
    amount,
  }: IRequest): Promise<IResponse> {
    const installment = await this.interest.installmentAmount(amount, times);

    const amountToPayBack = await this.interest.totalToPayBack(
      installment.toString(),
      times,
    );

    const monthlyInterest = await this.interest.monthlyInterest(
      amount,
      interest,
    );

    const partnerAmount = await this.interest.partnerAmount(amount);

    const firgunAmount = await this.interest.firgunAmount(amount);

    const interestResult = {
      installmentAmount: installment.toFixed(2),
      amountToPayBack: amountToPayBack.toFixed(2),
      monthlyInterest: monthlyInterest.toFixed(2),
      partnerAmountTotal: partnerAmount.toFixed(2),
      firgunAmountTotal: firgunAmount.toFixed(2),
    } as IResponse;

    return interestResult;
  }
}

export default InterestService;
