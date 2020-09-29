import AppError from '@shared/errors/AppErrors';

import FakeProjectBalanceRepository from '../../repositories/fakes/FakeProjectBalanceRepository';
import CheckProjectForBalanceService from '../CheckProjectForBalanceService';
import FakeProjectBalanceService from '../fakes/FakeProjectBalanceService';

let fakeprojectbalanceRepository: FakeProjectBalanceRepository;
let checkProject: CheckProjectForBalanceService;
let fakeProjectBalance: FakeProjectBalanceService;

describe('CheckProjectForBalanceService', () => {
  beforeEach(() => {
    fakeprojectbalanceRepository = new FakeProjectBalanceRepository();
    checkProject = new CheckProjectForBalanceService(
      fakeprojectbalanceRepository,
    );
    fakeProjectBalance = new FakeProjectBalanceService(
      fakeprojectbalanceRepository,
    );
  });

  it('must be able to verify the existence of project and the owner and return an error message', async () => {
    await expect(checkProject.execute(3, 13)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to the project', async () => {
    const project = await fakeProjectBalance.createProject({
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
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    await expect(await checkProject.execute(3, project.id)).toHaveProperty(
      'id',
    );
  });
});
