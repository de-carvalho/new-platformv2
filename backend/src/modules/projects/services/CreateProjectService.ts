import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  name: string;
  dateLimit: Date;
  description: string;
  goal: string;
  location: string;
  category: string;
  videoUrl: string;
  pageContent: string;
  moipAccountId: string;
  moipToken: string;
  partnerId: number;
  entrepreneurId: number;
  businessTime: string;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    name,
    category,
    dateLimit,
    description,
    goal,
    location,
    pageContent,
    videoUrl,
    entrepreneurId,
    moipAccountId,
    moipToken,
    partnerId,
    businessTime,
  }: IRequest): Promise<Project> {
    const findProjectInProgress = await this.projectsRepository.findByStatus(
      'CATCHING',
      'NOT_REFUNDED',
      entrepreneurId,
    );

    if (findProjectInProgress) {
      throw new AppError(
        'Você ainda não está habilitado para criar um novo projeto',
      );
    }

    const project = await this.projectsRepository.create({
      name,
      category,
      dateLimit,
      description,
      goal,
      location,
      pageContent,
      videoUrl,
      entrepreneurId,
      moipAccountId,
      moipToken,
      partnerId,
      paymentState: 'NOT_REFUNDED',
      state: 'CATCHING',
      businessTime,
    });

    return project;
  }
}

export default CreateProjectService;
