import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import QuizAnswer from '@modules/users/infra/typeorm/entities/QuizAnswers';
import IAdminAboutFirgunRepository from '@modules/users/repositories/IAdminAboutFirgunRepository';
import IQuizAnswerRepository from '@modules/users/repositories/IQuizAnswersRepository';

interface IRequest {
  answer: string;
  point: string;
  userId: number;
  questionId: number;
}

@injectable()
class QuizAnswerService {
  constructor(
    @inject('QuizAnswerRepository')
    private quizAnswerRepository: IQuizAnswerRepository,
    @inject('AdminAboutFirgunRepository')
    private adminAboutFirgun: IAdminAboutFirgunRepository,
  ) {}

  public async execute({
    answer,
    point,
    questionId,
    userId,
  }: IRequest): Promise<QuizAnswer> {
    const findLoggedUser = await this.adminAboutFirgun.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const answerQuiz = await this.quizAnswerRepository.create({
      answer,
      point,
      questionId,
    });

    return answerQuiz;
  }
}

export default QuizAnswerService;
