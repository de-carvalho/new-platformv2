import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import User from '../infra/typeorm/entities/User';
import IUserPJRepository from '../repositories/IUserPJRepository';

@injectable()
class GetUserService {
  constructor(
    @inject('UserPJRepository')
    private usersRepository: IUserPJRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const findPartners = await this.usersRepository.getAllPartners('PARTNER');

    if (findPartners?.length === 0) {
      throw new AppError('Nenhum parceiro foi encontrado');
    }

    return findPartners;
  }
}

export default GetUserService;
