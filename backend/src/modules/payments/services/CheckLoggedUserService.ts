import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import User from '@modules/users/infra/typeorm/entities/User';
import ITransfersRepository from '../repositories/ITransfersRepository';

@injectable()
class CheckLoggedUserService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
  ) {}

  public async execute(userId: number): Promise<User> {
    const findUser = await this.transfers.findUserById(userId);

    if (!findUser) {
      throw new AppError('O usuário não foi encontrado');
    }

    return findUser;
  }
}

export default CheckLoggedUserService;
