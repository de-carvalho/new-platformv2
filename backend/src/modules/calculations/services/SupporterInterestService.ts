import { injectable, inject } from 'tsyringe';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';

interface IRequest {
  amountEntrepreneur: string;
  times: number;
  amount: string;
  balanceDue: string;
}

interface IResponse {
  installmentAmount: string;
  amountTotalToReceive: string;
  monthyInterest: string;
  amountCorrected: string;
}

@injectable()
class SupporterInterestService {
  constructor(
    @inject('InterestRepository')
    private interest: InterestRepository,
  ) {}

  public async execute({
    amountEntrepreneur,
    times,
    amount,
    balanceDue,
  }: IRequest): Promise<IResponse> {
    const interestSupporter = await this.interest.supporterAmount(
      amount,
      amountEntrepreneur,
      balanceDue,
      times,
    );

    const interestResult = {
      amountTotalToReceive: interestSupporter.amountTotal.toFixed(2),
      installmentAmount: interestSupporter.installmentAmount.toFixed(2),
      monthyInterest: interestSupporter.monthyInterest.toFixed(2),
      amountCorrected: interestSupporter.amountCorrected.toFixed(2),
    } as IResponse;

    return interestResult;
  }
}

export default SupporterInterestService;
