import { injectable, inject } from 'tsyringe';
import { addDays, format } from 'date-fns';

import AppError from '@shared/errors/AppErrors';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';
import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';

interface IRequest {
  amount: string;
  interest?: string;
  userId: number;
  times: number;
  projectId: number;
}

interface IResponse {
  installmentAmount: string;
  monthlyInterest: string;
  amountToPayBack: string;
  finalDate: string;
  renegotiationData: [];
}

@injectable()
class RenegotiationService {
  constructor(
    @inject('InterestRepository')
    private interest: InterestRepository,

    @inject('EntrepreneurBankStatementRepository')
    private entrepreneursRepository: IEntrepreneurBankStatementRepository,
  ) {}

  public async execute({
    amount,
    userId,
    projectId,
    interest = '1',
    times,
  }: IRequest): Promise<IResponse> {
    const bankStatement = await this.entrepreneursRepository.getUserDataToPay(
      userId,
      projectId,
    );

    if (!bankStatement || bankStatement?.length === 0) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    const statement = bankStatement.map(item =>
      item.dueDate.toString().split('-'),
    );

    let amountTotal = 0;
    const newAmounts: {
      dueData: string;
      currentDate: string;
      amount: string;
    }[] = [];

    await statement.forEach(async item => {
      const newAmount = await this.interest.renegotiation(
        amount,
        new Date(Number(item[0]), Number(Number(item[1]) - 1), Number(item[2])),
      );
      const data = {
        dueData: `${item[2]}/${item[1]}/${item[0]}`,
        currentDate: format(Date.now(), 'dd/MM/yyyy'),
        amount: newAmount.toFixed(2),
      };

      newAmounts.push(data);

      amountTotal += Number(newAmount.toFixed(2));
    });

    const installment = await this.interest.installmentAmount(
      amountTotal.toString(),
      interest,
      times,
    );

    const amountToPayBack = await this.interest.totalToPayBack(
      installment.toString(),
      times,
    );

    const finalDate = format(
      addDays(Date.now(), Number(times) * 7),
      'dd/MM/yyyy',
    );

    const interestResult = {
      installmentAmount: installment.toFixed(2),
      amountToPayBack: amountToPayBack.toFixed(2),
      monthlyInterest: interest,
      finalDate,
      renegotiationData: newAmounts,
    } as IResponse;

    return interestResult;
  }
}

export default RenegotiationService;
