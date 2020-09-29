import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
// import Quiz from '@modules/users/infra/typeorm/entities/Quiz';
import IAdminAboutFirgunRepository from '@modules/users/repositories/IAdminAboutFirgunRepository';
import IQuizRepository from '@modules/users/repositories/IQuizRepository';

interface IRequest {
  userId: number;
}

@injectable()
class GetQuizService {
  constructor(
    @inject('QuizRepository')
    private quizRepository: IQuizRepository,
    @inject('AdminAboutFirgunRepository')
    private adminAboutFirgun: IAdminAboutFirgunRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<object[]> {
    const findLoggedUser = await this.adminAboutFirgun.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const questionQuiz = await this.quizRepository.getQuestions();

    if (questionQuiz.length === 0) {
      throw new AppError('Nenhuma questão foi encontrada');
    }

    return questionQuiz;
  }
}

export default GetQuizService;
