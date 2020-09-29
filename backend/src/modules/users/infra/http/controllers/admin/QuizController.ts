/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import QuizService from '@modules/users/services/admin/QuizService';
import GetQuizService from '@modules/users/services/admin/GetQuizService';
import EditQuizService from '@modules/users/services/admin/EditQuizService';

export default class QuizController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const quiz = container.resolve(GetQuizService);

    const listQuiz = await quiz.execute({ userId: Number(user_id) });

    return response.json(listQuiz);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { question } = request.body;

    const createQuiz = container.resolve(QuizService);

    const quiz = await createQuiz.execute({
      question,
      userId: Number(user_id),
    });

    return response.json(quiz);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { question, questionId } = request.body;

    const editQuiz = container.resolve(EditQuizService);

    const quiz = await editQuiz.execute({
      question,
      questionId,
      userId: Number(user_id),
    });

    return response.json(quiz);
  }
}
