import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUserPFRepository';

import User from '../infra/typeorm/entities/User';

@injectable()
class UpdateUserPFService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: number): Promise<User | undefined> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser || findUser.id !== userId) {
      throw new AppError('Nenhum usuário foi encontrado.');
    }

    return findUser;
  }
}

export default UpdateUserPFService;
