/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import QuizAnswerService from '@modules/users/services/admin/QuizAnswerService';
import GetQuizAnswerService from '@modules/users/services/admin/GetQuizAnswerService';
import EditQuizAnswerService from '@modules/users/services/admin/EditQuizAnswerService';

export default class QuizAnswerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { answer_id } = request.query;

    const quizAnswers = container.resolve(GetQuizAnswerService);

    const listQuizAnswers = await quizAnswers.execute({
      userId: Number(user_id),
      answerId: Number(answer_id),
    });

    return response.json(listQuizAnswers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { answer, point, questionId } = request.body;

    const createQuizAnswer = container.resolve(QuizAnswerService);

    const quizAnswer = await createQuizAnswer.execute({
      answer,
      point,
      questionId,
      userId: Number(user_id),
    });

    return response.json(quizAnswer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { answer, point, answerId } = request.body;

    const editQuizAnswer = container.resolve(EditQuizAnswerService);

    const answerQuiz = await editQuizAnswer.execute({
      answer,
      point,
      userId: Number(user_id),
      answerId,
    });

    return response.json(answerQuiz);
  }
}
