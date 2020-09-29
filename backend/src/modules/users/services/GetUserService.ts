import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import User from '../infra/typeorm/entities/User';
import IUserPFRepository from '../repositories/IUserPFRepository';

@injectable()
class GetUserService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUserPFRepository,
  ) {}

  public async execute(userId: number): Promise<User | undefined> {
    // Busca os dados do usuário no banco de dados
    const findUser = await this.usersRepository.getUserData(userId);

    if (!findUser) {
      throw new AppError('Nenhum usuário foi encontrado');
    }

    return findUser;
  }
}

export default GetUserService;
