import Quiz from '../infra/typeorm/entities/Quiz';

interface IQuizRequest {
  question: string;
}

interface IQuizResponse {
  question: Quiz;
  answers: [];
}

export default interface IQuizRepository {
  create(question: IQuizRequest): Promise<Quiz>;
  save(data: Quiz): Promise<Quiz>;
  findById(questionId: number): Promise<Quiz | undefined>;
  getQuestions(): Promise<IQuizResponse[]>;
}
