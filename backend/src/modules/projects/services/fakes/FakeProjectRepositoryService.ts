/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';
import IProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';

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
class FakeProjectRepositoryService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
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
    moipAccountId,
    moipToken,
    partnerId,
    paymentState,
    state,
    businessTime,
  }: IRequestProject): Promise<Project> {
    const project = await this.projectsRepository.createProject({
      name,
      category,
      dateLimit,
      description,
      goal,
      location,
      pageContent,
      videoUrl,
      entrepreneurId,
      moipAccountId,
      moipToken,
      partnerId,
      paymentState,
      state,
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
    const user = await this.projectsRepository.createUser({
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

export default FakeProjectRepositoryService;
