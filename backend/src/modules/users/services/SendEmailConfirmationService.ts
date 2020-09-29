import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppErrors';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUserPFRepository';
import UserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendEmailConfirmationService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'emailConfirmation.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: user.firstName,
        email: user.email,
      },
      subject: '[Firgun] Confirmação de email',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.firstName,
          link: `${process.env.APP_WEB_URL}/email_confirmation?token=${token}`,
        },
      },
    });
  }
}

export default SendEmailConfirmationService;
