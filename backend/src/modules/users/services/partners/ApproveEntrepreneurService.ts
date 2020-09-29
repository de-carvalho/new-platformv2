import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../../repositories/IUserPJRepository';

import User from '../../infra/typeorm/entities/User';

@injectable()
class ApproveEntrepreneurService {
  constructor(
    @inject('UserPJRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    userId: number,
    entrepreneurId: number,
    confirmationStatus: boolean,
  ): Promise<User> {
    const findUser = await this.usersRepository.findById(entrepreneurId);

    if (!findUser) {
      throw new AppError('Nenhum usuário foi encontrado.');
    }

    if (findUser.partnerId !== userId) {
      throw new AppError('Nenhum empreendedor foi encontrado.');
    }

    // Verifica o status da confirmação, caso seja false o empreendedor é reprovado
    if (confirmationStatus === false) {
      findUser.partnerConfirmed = false;

      const entrepreneurRepproved = await this.usersRepository.save(findUser);

      return entrepreneurRepproved;
    }

    findUser.partnerConfirmed = true;

    const entrepreneurApproved = await this.usersRepository.save(findUser);

    return entrepreneurApproved;
  }
}

export default ApproveEntrepreneurService;
