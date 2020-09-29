import { getRepository, Repository } from 'typeorm';

import IQuizAnswerRepository from '@modules/users/repositories/IQuizAnswersRepository';
import QuizAnswer from '@modules/users/infra/typeorm/entities/QuizAnswers';

interface IQuizAnswersRequest {
  answer: string;
  point: string;
  questionId: number;
}

class QuizAnswerRepository implements IQuizAnswerRepository {
  private ormRepository: Repository<QuizAnswer>;

  constructor() {
    this.ormRepository = getRepository(QuizAnswer);
  }

  public async getAnswers(): Promise<QuizAnswer[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  public async findById(anwerId: number): Promise<QuizAnswer | undefined> {
    const data = await this.ormRepository.findOne(anwerId);

    return data;
  }

  public async create(data: IQuizAnswersRequest): Promise<QuizAnswer> {
    const createdData = this.ormRepository.create(data);

    await this.ormRepository.save(createdData);

    return createdData;
  }

  public async save(data: QuizAnswer): Promise<QuizAnswer> {
    const updatedData = this.ormRepository.save(data);

    return updatedData;
  }
}

export default QuizAnswerRepository;
