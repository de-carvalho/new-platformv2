import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Transfers from '@modules/payments/infra/typeorm/entities/Transfers';
import ITransfersRepository from '@modules/payments/repositories/ITransfersRepository';

interface IRequest {
  amount: string;
  payeeId: number;
  fullname: string;
  accountType: string;
  taxDocumentType: string;
  taxDocumentNumber: string;
  method: string;
  bankNumber: string;
  agencyNumber: string;
  agencyCheckNumber: number;
  accountNumber: number;
  accountCheckNumber: number;
  userId: number;
  state: string;
  moipTransfersId: string;
}

@injectable()
class WithdrawnMoneyService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
  ) {}

  public async execute({
    fullname,
    taxDocumentType,
    taxDocumentNumber,
    amount,
    accountType,
    bankNumber,
    method,
    agencyNumber,
    agencyCheckNumber,
    accountNumber,
    accountCheckNumber,
    userId,
    payeeId,
    state,
    moipTransfersId,
  }: IRequest): Promise<Transfers> {
    const findUser = await this.transfers.findUserById(userId);

    if (!findUser) {
      throw new AppError('O usuário não foi encontrado');
    }

    const transfers = await this.transfers.create({
      amount,
      accountType,
      bankNumber,
      agencyNumber,
      agencyCheckNumber,
      accountNumber,
      accountCheckNumber,
      fullname,
      taxDocumentType,
      taxDocumentNumber,
      userId,
      payeeId,
      state,
      moipTransfersId,
      method,
    });

    return transfers;
  }
}

export default WithdrawnMoneyService;
