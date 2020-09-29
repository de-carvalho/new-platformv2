import AppError from '@shared/errors/AppErrors';

import FakeProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '../CreateProjectService';

let fakeprojectsRepository: FakeProjectsRepository;
let createProject: CreateProjectService;

describe('CreateProject', () => {
  beforeEach(() => {
    fakeprojectsRepository = new FakeProjectsRepository();
    createProject = new CreateProjectService(fakeprojectsRepository);
  });

  it('should be able to create a new project', async () => {
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

    expect(project).toHaveProperty('id');
    expect(project.entrepreneurId).toBe(3);
    expect(project.state).toBe('CATCHING');
  });

  it('should not be able to create another project when the current is not completed and refunded', async () => {
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

    expect(
      createProject.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
