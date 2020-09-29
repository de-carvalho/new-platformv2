import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import User from '@modules/users/infra/typeorm/entities/User';
import ITransfersRepository from '../repositories/ITransfersRepository';

@injectable()
class CheckTargetUserService {
  constructor(
    @inject('TransfersRepository')
    private transfers: ITransfersRepository,
  ) {}

  public async execute(
    taxDocumentNumber: string,
    email: string,
  ): Promise<User> {
    const findUser = await this.transfers.findUser(taxDocumentNumber, email);

    if (!findUser) {
      throw new AppError('O destinatário não foi encontrado');
    }

    return findUser;
  }
}

export default CheckTargetUserService;
