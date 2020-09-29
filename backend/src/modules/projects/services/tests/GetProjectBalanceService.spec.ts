import FakeProjectBalanceRepository from '../../repositories/fakes/FakeProjectBalanceRepository';
import GetProjectBalanceService from '../GetProjectBalanceService';

let fakeprojectbalanceRepository: FakeProjectBalanceRepository;
let getProjects: GetProjectBalanceService;

describe('GetProjectBalance', () => {
  beforeEach(() => {
    fakeprojectbalanceRepository = new FakeProjectBalanceRepository();
    getProjects = new GetProjectBalanceService(fakeprojectbalanceRepository);
  });

  it('should be able to get the project balance', async () => {
    const balance = await getProjects.execute({
      accessToken: 'M-3253wefwe353v2',
      current: '200',
      future: '100',
      date: new Date(),
      moipAccountId: 'M-fsa8fas098as9',
      unavailable: '300',
      projectId: 2,
    });

    expect(balance).toHaveProperty('id');
  });

  it('should be able to get and edit the project balance', async () => {
    await getProjects.execute({
      accessToken: 'M-3253wefwe353v2',
      current: '200',
      future: '100',
      date: new Date(),
      moipAccountId: 'M-fsa8fas098as9',
      unavailable: '300',
      projectId: 2,
    });

    const balance = await getProjects.execute({
      accessToken: 'M-3253wefwe353v2',
      current: '200',
      future: '100',
      date: new Date(),
      moipAccountId: 'M-fsa8fas098as9',
      unavailable: '300',
      projectId: 2,
    });

    expect(balance).toHaveProperty('id');
  });
});
