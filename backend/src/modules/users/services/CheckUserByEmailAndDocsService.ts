import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUserPFRepository';

import User from '../infra/typeorm/entities/User';

@injectable()
class CheckUserByEmailAndDocs {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUsersRepository,
  ) {}

  // Faz a verificação da existência de um usuário com os mesmo email ou CPF
  public async execute(
    email: string,
    taxDocumentNumber: string,
    role: string,
    partnerId: number,
    accountType: string,
  ): Promise<User | undefined> {
    if (role === 'ENTREPRENEUR') {
      const findPartner = await this.usersRepository.findById(partnerId);
      if (!findPartner || findPartner.role !== 'PARTNER') {
        throw new AppError('Parceiro não foi encontrado.');
      }
    }

    const findUser = await this.usersRepository.findByEmailAndDocNumber(
      email,
      taxDocumentNumber,
      role,
      accountType,
    );

    if (findUser) {
      throw new AppError(
        'Este Email e o número de documento já estão cadastrados.',
      );
    }

    const findUserByEmail = await this.usersRepository.checkByEmail(
      email,
      role,
      accountType,
    );

    if (findUserByEmail) {
      throw new AppError('Este Email já está cadastrado.');
    }

    const findUserByDocNumber = await this.usersRepository.findByDocNumber(
      taxDocumentNumber,
      role,
      accountType,
    );

    if (findUserByDocNumber) {
      throw new AppError('Este número de documento já está cadastrado.');
    }

    return findUserByEmail;
  }
}

export default CheckUserByEmailAndDocs;
