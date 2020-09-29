import { getRepository, Repository } from 'typeorm';

import IQuizRepository from '@modules/users/repositories/IQuizRepository';
import Quiz from '@modules/users/infra/typeorm/entities/Quiz';

import QuizAnswer from '@modules/users/infra/typeorm/entities/QuizAnswers';

interface IQuizRequest {
  question: string;
}

interface IQuizResponse {
  question: Quiz;
  answers: [];
}

class QuizRepository implements IQuizRepository {
  private ormRepository: Repository<Quiz>;

  private answerRepository: Repository<QuizAnswer>;

  private questionsArray: IQuizResponse[];

  constructor() {
    this.ormRepository = getRepository(Quiz);
    this.answerRepository = getRepository(QuizAnswer);
    this.questionsArray = [];
  }

  public async findById(questionId: number): Promise<Quiz | undefined> {
    const question = await this.ormRepository.findOne(questionId);

    return question;
  }

  public async getQuestions(): Promise<IQuizResponse[]> {
    const questions = await this.ormRepository.find();

    questions.forEach(async question => {
      const answers = await this.answerRepository.find({
        where: { questionId: question.id },
      });

      const data = {
        question,
        answers,
      } as IQuizResponse;

      this.questionsArray.push(data);
    });

    await new Promise(resolve => setTimeout(resolve, 200));

    return this.questionsArray;
  }

  public async create(data: IQuizRequest): Promise<Quiz> {
    const createdData = this.ormRepository.create(data);

    await this.ormRepository.save(createdData);

    return createdData;
  }

  public async save(data: Quiz): Promise<Quiz> {
    const updatedData = this.ormRepository.save(data);

    return updatedData;
  }
}

export default QuizRepository;
