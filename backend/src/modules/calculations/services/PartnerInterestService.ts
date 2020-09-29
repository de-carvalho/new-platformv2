import { injectable, inject } from 'tsyringe';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';

interface IRequest {
  amount: string;
}

@injectable()
class PartnerInterestService {
  constructor(
    @inject('InterestRepository')
    private interest: InterestRepository,
  ) {}

  public async execute({ amount }: IRequest): Promise<number> {
    const interestPartner = await this.interest.partnerAmount(amount);

    return interestPartner;
  }
}

export default PartnerInterestService;
