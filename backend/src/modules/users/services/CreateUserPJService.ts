import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUserPJRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import IRequest from '../dtos/ICreateUserPJDTO';

@injectable()
class CreateUserPJService {
  constructor(
    @inject('UserPJRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    ownId,
    firstName,
    lastName,
    email,
    dob,
    passwordHash,
    partnerId,
    taxDocumentType,
    taxDocumentNumber,
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
    companyName,
    businessName,
    companyAddressCity,
    companyAddressComplement,
    companyAddressDistrict,
    companyAddressNumber,
    companyAddressZipcode,
    companyAddressStreet,
    companyAddressState,
    companyPhoneArea,
    companyPhoneNumber,
    cpfResponsible,
    emailResponsible,
  }: IRequest): Promise<User> {
    const hashedPassword = await this.hashProvider.generateHash(passwordHash);

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      ownId,
      email,
      dob,
      passwordHash: hashedPassword,
      taxDocumentType,
      taxDocumentNumber,
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
      role,
      accountType,
      partnerId,
      companyName,
      businessName,
      companyAddressCity,
      companyAddressComplement,
      companyAddressDistrict,
      companyAddressNumber,
      companyAddressZipcode,
      companyAddressStreet,
      companyAddressState,
      companyPhoneArea,
      companyPhoneNumber,
      cpfResponsible,
      emailResponsible,
    });

    return user;
  }
}

export default CreateUserPJService;
