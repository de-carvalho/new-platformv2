import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../../repositories/IUserPJRepository';

import User from '../../infra/typeorm/entities/User';

@injectable()
class GetEntrepreneursService {
  constructor(
    @inject('UserPJRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: number): Promise<User[] | undefined> {
    const findEntrepreneurs = await this.usersRepository.getApprovedEntrepreneurs(
      userId,
    );

    if (findEntrepreneurs?.length === 0) {
      throw new AppError('Nenhum empreendedor foi encontrado.');
    }

    return findEntrepreneurs;
  }
}

export default GetEntrepreneursService;
