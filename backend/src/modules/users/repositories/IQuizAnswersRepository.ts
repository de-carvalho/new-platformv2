import QuizAnswers from '../infra/typeorm/entities/QuizAnswers';

interface IQuizAnswersRequest {
  answer: string;
  point: string;
  questionId: number;
}

export default interface IQuizAnswersRepository {
  create(data: IQuizAnswersRequest): Promise<QuizAnswers>;
  save(data: QuizAnswers): Promise<QuizAnswers>;
  findById(answerId: number): Promise<QuizAnswers | undefined>;
  getAnswers(): Promise<QuizAnswers[]>;
}
