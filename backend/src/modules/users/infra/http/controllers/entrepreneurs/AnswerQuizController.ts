import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AnswerQuizService from '@modules/users/services/entrepreneurs/AnswerQuizService';

export default class RequestContractController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { quizScore } = request.body;

    const answerQuiz = container.resolve(AnswerQuizService);

    const answer = await answerQuiz.execute({
      quizScore,
      userId: Number(user_id),
    });

    return response.json(classToClass(answer));
  }
}
