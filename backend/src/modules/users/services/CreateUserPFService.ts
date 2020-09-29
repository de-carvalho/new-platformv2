import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUserPFRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import IRequest from '../dtos/ICreateUserPFDTO';

@injectable()
class CreateUserPFService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
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

export default CreateUserPFService;
