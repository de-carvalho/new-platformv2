import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUserPFRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  userId: number;
  firstName: string;
  lastName: string;
  gender: string;
  profession: string;
  race: string;
  dob: Date;
  email: string;
  oldPassword?: string;
  passwordHash?: string;
  passwordConfirmation?: string;
  phoneArea: string;
  phoneNumber: string;
  cellphoneArea: string;
  cellphoneNumber: string;
  addressCity: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressState: string;
  addressDistrict: string;
  addressZipcode: string;
  origens: string;
  credit: string;
  bankAccountNumber: string;
  bankNumber: string;
  bankAccountType: string;
  bankAgencyNumber: string;
  identityIssueDate: string;
  identityIssuer: string;
  bankAgencyCheckNumber: number;
  bankAccountCheckNumber: number;
}

@injectable()
class UpdateUserPFService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    firstName,
    lastName,
    gender,
    profession,
    race,
    dob,
    email,
    passwordHash,
    oldPassword,
    phoneArea,
    phoneNumber,
    cellphoneArea,
    cellphoneNumber,
    addressCity,
    addressStreet,
    addressNumber,
    addressComplement,
    addressState,
    addressDistrict,
    addressZipcode,
    origens,
    credit,
    bankAccountNumber,
    bankNumber,
    bankAccountType,
    bankAgencyNumber,
    userId,
    identityIssuer,
    identityIssueDate,
    bankAccountCheckNumber,
    bankAgencyCheckNumber,
    passwordConfirmation,
  }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Nenhum usuário foi encontrado.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('Este email já está sendo usado por outro usuário');
    }

    findUser.firstName = firstName;
    findUser.lastName = lastName;
    findUser.gender = gender;
    findUser.profession = profession;
    findUser.race = race;
    findUser.dob = dob;
    findUser.email = email;
    findUser.bankAccountNumber = bankAccountNumber;
    findUser.bankAccountType = bankAccountType;
    findUser.bankNumber = bankNumber;
    findUser.bankAgencyNumber = bankAgencyNumber;
    findUser.addressNumber = addressNumber;
    findUser.addressCity = addressCity;
    findUser.addressComplement = addressComplement;
    findUser.addressDistrict = addressDistrict;
    findUser.addressStreet = addressStreet;
    findUser.addressZipcode = addressZipcode;
    findUser.addressState = addressState;
    findUser.origens = origens;
    findUser.credit = credit;
    findUser.phoneArea = phoneArea;
    findUser.phoneNumber = phoneNumber;
    findUser.cellphoneArea = cellphoneArea;
    findUser.cellphoneNumber = cellphoneNumber;
    findUser.identityIssuer = identityIssuer;
    findUser.identityIssueDate = identityIssueDate;
    findUser.bankAccountCheckNumber = bankAccountCheckNumber;
    findUser.bankAgencyCheckNumber = bankAgencyCheckNumber;

    if (passwordHash && !oldPassword) {
      throw new AppError('Você precisa informar a senha anterior');
    }

    if (passwordHash && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        findUser.passwordHash,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha atual informada está errada');
      }

      if (passwordHash !== passwordConfirmation) {
        throw new AppError('As senhas informadas são diferentes');
      }

      findUser.passwordHash = await this.hashProvider.generateHash(
        passwordHash,
      );
    }

    const userUpdated = await this.usersRepository.save(findUser);

    return userUpdated;
  }
}

export default UpdateUserPFService;
