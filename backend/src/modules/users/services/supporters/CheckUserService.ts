import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import User from '@modules/users/infra/typeorm/entities/User';
import ITransfersRepository from '@modules/payments/repositories/ITransfersRepository';

@injectable()
class CheckUserService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
  ) {}

  public async execute(userId: number): Promise<User> {
    const findUser = await this.transfers.findUserById(userId);

    if (!findUser) {
      throw new AppError('O usuário não foi encontrado');
    }

    if (
      findUser.bankNumber === null ||
      findUser.bankAccountNumber === null ||
      findUser.bankAgencyNumber === null ||
      findUser.bankAccountType === null
    ) {
      throw new AppError('Você precisa cadastrar os seus dados bancários');
    }
    return findUser;
  }
}

export default CheckUserService;
