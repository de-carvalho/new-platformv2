import { injectable, inject } from 'tsyringe';

import Transfers from '../infra/typeorm/entities/Transfers';
import ITransfersRepository from '../repositories/ITransfersRepository';

interface IRequest {
  amount: string;
  accountType: string;
  method: string;
  bankNumber: string;
  agencyNumber: string;
  agencyCheckNumber: number;
  accountNumber: number;
  accountCheckNumber: number;
  fullname: string;
  taxDocumentType: string;
  taxDocumentNumber: string;
  userId: number;
  payeeId: number;
  state: string;
  moipTransfersId: string;
}

@injectable()
class CreateTransfersService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
  ) {}

  public async execute({
    amount,
    accountType,
    bankNumber,
    method,
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
  }: IRequest): Promise<Transfers> {
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

export default CreateTransfersService;
