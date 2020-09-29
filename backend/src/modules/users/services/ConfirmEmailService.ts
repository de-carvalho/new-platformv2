import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import path from 'path';

import AppError from '@shared/errors/AppErrors';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUserPFRepository';
import UserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  token: string;
}

@injectable()
class EmailConfirmationService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token de usuário não encontrado.');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (user.emailConfirmed) {
      throw new AppError('Você já confirmou o seu email');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 1);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.emailConfirmed = true;
    user.emailConfirmationCode = token;

    await this.usersRepository.save(user);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'entrepreneurAnswerQuiz.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: user.firstName,
        email: user.email,
      },
      subject: '[Firgun] Responder - Teste psicométrico',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.firstName,
          link: `${process.env.APP_WEB_URL}/test`,
        },
      },
    });
  }
}

export default EmailConfirmationService;
