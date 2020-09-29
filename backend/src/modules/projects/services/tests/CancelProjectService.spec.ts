import AppError from '@shared/errors/AppErrors';

import FakeProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';
import CancelProjectService from '../CancelProjectService';
import CreateProjectService from '../CreateProjectService';

let fakeprojectsRepository: FakeProjectsRepository;
let cancelProject: CancelProjectService;
let createProject: CreateProjectService;

describe('CancelProject', () => {
  beforeEach(() => {
    fakeprojectsRepository = new FakeProjectsRepository();
    cancelProject = new CancelProjectService(fakeprojectsRepository);
    createProject = new CreateProjectService(fakeprojectsRepository);
  });

  it('should be able to cancel a project', async () => {
    const createdProject = await createProject.execute({
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
      cancelProject.execute({
        projectId: 22,
        userId: 3,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      cancelProject.execute({
        projectId: createdProject.id,
        userId: 44,
      }),
    ).rejects.toBeInstanceOf(AppError);

    const canceledProject = await cancelProject.execute({
      projectId: createdProject.id,
      userId: 3,
    });

    expect(canceledProject).toHaveProperty('id');
    expect(canceledProject.entrepreneurId).toBe(3);
    expect(canceledProject.state).toBe('CANCELED');
  });
});
