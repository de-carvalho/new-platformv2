/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';
import IPaymentsRepository from '../../repositories/fakes/FakePaymentRepository';

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
class FakeCreatePaymentService {
  constructor(
    @inject('PaymentRepository')
    private paymentsRepository: IPaymentsRepository,
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
    const project = await this.paymentsRepository.createProject({
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
    const user = await this.paymentsRepository.createUser({
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

export default FakeCreatePaymentService;
