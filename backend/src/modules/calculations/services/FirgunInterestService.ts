import { injectable, inject } from 'tsyringe';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';

interface IRequest {
  amount: string;
}

interface IResponse {
  firgunAmount: string;
  entrepreneurAmount: string;
}

@injectable()
class FirgunInterestService {
  constructor(
    @inject('InterestRepository')
    private interest: InterestRepository,
  ) {}

  public async execute({ amount }: IRequest): Promise<IResponse> {
    const interestFirgun = await this.interest.firgunAmount(amount);

    const entrepreneurAmount = Number(amount) - interestFirgun;

    const result = {
      firgunAmount: interestFirgun.toFixed(2),
      entrepreneurAmount: entrepreneurAmount.toFixed(2),
    } as IResponse;

    return result;
  }
}

export default FirgunInterestService;
