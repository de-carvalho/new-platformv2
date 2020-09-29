import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUserPFRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  passwordHash: string;
}

interface IUserData {
  id: number;
  accountType: string;
  role: string;
  name: string;
}

interface IResponse {
  user: IUserData;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, passwordHash }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou Senha digitados estão incorretos', 401);
    }

    if (user.emailConfirmed !== true) {
      throw new AppError('Você ainda não confirmou o seu email', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      passwordHash,
      user.passwordHash,
    );

    if (!passwordMatched) {
      throw new AppError('Email ou Senha digitados estão incorretos', 401);
    }

    const userData = {
      id: user.id,
      accountType: user.accountType,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`,
    };

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, String(secret), {
      subject: `${user.id}`,
      expiresIn,
    });

    return {
      user: userData,
      token,
    };
  }
}

export default AuthenticateUserService;
