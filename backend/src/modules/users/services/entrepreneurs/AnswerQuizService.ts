import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';
import path from 'path';

import AppError from '@shared/errors/AppErrors';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import User from '../../infra/typeorm/entities/User';
import IUserPFRepository from '../../repositories/IUserPFRepository';

interface IRequest {
  userId: number;
  quizScore: string;
}

@injectable()
class AnswerQuizService {
  constructor(
    @inject('UserPFRepository')
    private usersRepository: IUserPFRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ userId, quizScore }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Nenhum usuário foi encontrado');
    }

    findUser.quizScore = quizScore;
    findUser.quizAnswerDate = String(format(Date.now(), 'dd/MM/yyyy'));

    await this.usersRepository.save(findUser);

    if (Number(quizScore) >= 0 || Number(quizScore) === 106) {
      const quizAnswerTemplate = path.resolve(
        __dirname,
        '..',
        '..',
        'views',
        'entrepreneurTestPassed.hbs',
      );

      await this.mailProvider.sendMail({
        to: {
          name: findUser.firstName,
          email: findUser.email,
        },
        subject: '[Firgun] Resultado - Teste psicométrico',
        templateData: {
          file: quizAnswerTemplate,
          variables: {
            name: findUser.firstName,
            score: quizScore,
            link: `${process.env.APP_WEB_URL}/entrepreneur/documents`,
          },
        },
      });
    }

    if (Number(quizScore) < 0) {
      const quizAnswerTemplate = path.resolve(
        __dirname,
        '..',
        '..',
        'views',
        'entrepreneurTestReproved.hbs',
      );

      await this.mailProvider.sendMail({
        to: {
          name: findUser.firstName,
          email: findUser.email,
        },
        subject: '[Firgun] Resultado - Teste psicométrico',
        templateData: {
          file: quizAnswerTemplate,
          variables: {
            name: findUser.firstName,
            score: quizScore,
            link: `${process.env.APP_WEB_URL}/entrepreneur/documents`,
          },
        },
      });
    }

    return findUser;
  }
}

export default AnswerQuizService;
