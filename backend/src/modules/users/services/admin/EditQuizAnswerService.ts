import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import QuizAnswer from '@modules/users/infra/typeorm/entities/QuizAnswers';
import IAdminAboutFirgunRepository from '@modules/users/repositories/IAdminAboutFirgunRepository';
import IQuizAnswerRepository from '@modules/users/repositories/IQuizAnswersRepository';

interface IRequest {
  answer: string;
  point: string;
  userId: number;
  answerId: number;
}

@injectable()
class EditQuizAnswerService {
  constructor(
    @inject('QuizAnswerRepository')
    private quizAnswerRepository: IQuizAnswerRepository,
    @inject('AdminAboutFirgunRepository')
    private adminAboutFirgun: IAdminAboutFirgunRepository,
  ) {}

  public async execute({
    answer,
    point,
    answerId,
    userId,
  }: IRequest): Promise<QuizAnswer> {
    const findLoggedUser = await this.adminAboutFirgun.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const answerQuiz = await this.quizAnswerRepository.findById(answerId);

    if (!answerQuiz) {
      throw new AppError('Nenhuma resposta foi encontrada');
    }

    answerQuiz.answer = answer;
    answerQuiz.point = point;

    await this.quizAnswerRepository.save(answerQuiz);

    return answerQuiz;
  }
}

export default EditQuizAnswerService;
