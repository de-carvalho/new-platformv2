import AppError from '@shared/errors/AppErrors';

import FakeProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';
import GetProjectsInProgressService from '../GetProjectsInProgressService';
import CreateProjectService from '../CreateProjectService';

let fakeprojectsRepository: FakeProjectsRepository;
let getProjects: GetProjectsInProgressService;
let createProject: CreateProjectService;

describe('GetProjectInProgress', () => {
  beforeEach(() => {
    fakeprojectsRepository = new FakeProjectsRepository();
    getProjects = new GetProjectsInProgressService(fakeprojectsRepository);
    createProject = new CreateProjectService(fakeprojectsRepository);
  });

  it('should be able to return all projects in progress', async () => {
    const project = await createProject.execute({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 3,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.projectType = 1;

    const projects = await getProjects.execute();

    expect(projects).toHaveLength(1);
  });

  it('should return an empty array of projects', async () => {
    await expect(getProjects.execute()).rejects.toBeInstanceOf(AppError);
  });
});
