import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import Balance from '@modules/balance/infra/typeorm/entities/Balance';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import ProjectBalance from '@modules/projects/infra/typeorm/entities/ProjectBalance';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';
import IProjectBalanceDTO from '@modules/projects/dtos/IProjectBalanceDTO';
import IGetAccountBalanceDTO from '@modules/balance/dtos/IGetAccountBalanceDTO';
import ITransfersRepository from '../../repositories/fakes/FakeTransfersRepository';

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
class FakeCreateTransfersService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
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
    const project = await this.transfers.createProject({
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

  public async createUserBalance({
    accessToken,
    current,
    future,
    date,
    moipAccountId,
    unavailable,
    userId,
  }: IGetAccountBalanceDTO): Promise<Balance> {
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

  public async createProjectBalance({
    accessToken,
    current,
    future,
    date,
    moipAccountId,
    unavailable,
    projectId,
  }: IProjectBalanceDTO): Promise<ProjectBalance> {
    const balanceCreated = await this.transfers.createProjectBalance({
      accessToken,
      current,
      future,
      date,
      moipAccountId,
      unavailable,
      projectId,
    });

    return balanceCreated;
  }
}

export default FakeCreateTransfersService;
