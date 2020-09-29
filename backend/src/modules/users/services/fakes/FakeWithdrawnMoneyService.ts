import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Balance from '@modules/balance/infra/typeorm/entities/Balance';
import User from '@modules/users/infra/typeorm/entities/User';
import Transfers from '@modules/payments/infra/typeorm/entities/Transfers';
import ITransfersRepository from '@modules/payments/repositories/fakes/FakeTransfersRepository';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';

interface IRequest {
  amount: number;
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

interface IRequestBalance {
  accessToken: string;
  future: number;
  date: Date;
  unavailable: number;
  current: number;
  moipAccountId: string;
  userId: number;
}

@injectable()
class FakeWithdrawnMoneyService {
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

  public async createUserBalance({
    accessToken,
    current,
    future,
    date,
    moipAccountId,
    unavailable,
    userId,
  }: IRequestBalance): Promise<Balance> {
    const findUserBalance = await this.transfers.checkUserBalance(userId);

    if (!findUserBalance) {
      const balanceCreated = await this.transfers.createUserBalance({
        accessToken,
        current,
        future,
        date,
        moipAccountId,
        unavailable,
        userId,
      });

      return balanceCreated;
    }

    findUserBalance.date = date;
    findUserBalance.current = current;
    findUserBalance.future = future;
    findUserBalance.unavailable = unavailable;

    const balanceUpdated = await this.transfers.updateUserBalance(
      findUserBalance,
    );

    return balanceUpdated;
  }

  public async findUser(userId: number): Promise<User> {
    const findUser = await this.transfers.findUserById(userId);

    if (!findUser) {
      throw new AppError('O usuário não foi encontrado');
    }

    if (
      findUser.bankNumber === null ||
      findUser.bankAccountNumber === null ||
      findUser.bankAgencyNumber === null ||
      findUser.bankAccountType === null
    ) {
      throw new AppError('Você precisa cadastrar os seus dados bancários');
    }
    return findUser;
  }

  public async checkUserBalance(
    userId: number,
    amount: number,
  ): Promise<Balance | undefined> {
    const userBalance = await this.transfers.checkUserBalance(userId);

    if (userBalance) {
      if (userBalance.current <= 0) {
        throw new AppError(
          'O seu saldo é insuficiente para completar a operação.',
        );
      }

      if (amount > userBalance.current) {
        throw new AppError(
          'O valor a ser sacado não pode ser maior que seu saldo atual',
        );
      }
    }
    return userBalance;
  }

  public async createUser({
    ownId,
    firstName,
    lastName,
    dob,
    email,
    passwordHash,
    partnerId,
    taxDocumentType,
    taxDocumentNumber,
    phoneArea,
    phoneNumber,
    cellphoneArea,
    cellphoneNumber,
    moipAccountId,
    moipCustomerId,
    moipToken,
    addressCity,
    addressStreet,
    addressNumber,
    addressComplement,
    addressState,
    addressDistrict,
    addressZipcode,
    origens,
    credit,
    value,
    role,
    accountType,
  }: ICreateUserPFDTO): Promise<User> {
    const user = await this.transfers.createUser({
      firstName,
      lastName,
      ownId,
      email,
      dob,
      passwordHash,
      taxDocumentType,
      taxDocumentNumber,
      phoneArea,
      phoneNumber,
      cellphoneArea,
      cellphoneNumber,
      moipAccountId,
      moipCustomerId,
      moipToken,
      addressCity,
      addressDistrict,
      addressNumber,
      addressComplement,
      addressState,
      addressStreet,
      addressZipcode,
      origens,
      credit,
      value,
      accountType,
      partnerId,
      role,
    });

    return user;
  }
}

export default FakeWithdrawnMoneyService;
