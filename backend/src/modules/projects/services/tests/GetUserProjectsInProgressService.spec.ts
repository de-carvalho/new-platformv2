import AppError from '@shared/errors/AppErrors';

import FakeProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';
import GetUserProjectsInProgressService from '../GetUserProjectInProgressService';
import CreateProjectService from '../CreateProjectService';

let fakeprojectsRepository: FakeProjectsRepository;
let getProject: GetUserProjectsInProgressService;
let createProject: CreateProjectService;

describe('GetUserProjectInProgress', () => {
  beforeEach(() => {
    fakeprojectsRepository = new FakeProjectsRepository();
    getProject = new GetUserProjectsInProgressService(fakeprojectsRepository);
    createProject = new CreateProjectService(fakeprojectsRepository);
  });

  it('should be able to return all projects in progress', async () => {
    await createProject.execute({
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

    const project = await getProject.execute(3);

    expect(project).toHaveProperty('id');
    expect(project?.entrepreneurId).toBe(3);
    expect(project?.state).toBe('CATCHING');
  });

  it('should return an empty array of projects', async () => {
    expect(getProject.execute(4)).rejects.toBeInstanceOf(AppError);
  });
});
