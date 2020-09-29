import FakeBalanceRepository from '../../repositories/fakes/FakeBalanceRepository';
import GetUserBalanceService from '../GetAccountBalanceService';

describe('GetUser', () => {
  it('should be able to get the user balance data', async () => {
    const fakeBalanceRepository = new FakeBalanceRepository();
    const getUserBalance = new GetUserBalanceService(fakeBalanceRepository);

    const createdUserBalance = await getUserBalance.execute({
      accessToken: 'efs54325kh3df',
      current: '54',
      future: '34',
      date: new Date(),
      moipAccountId: '89sagassa90uas',
      unavailable: '45',
      userId: 3,
    });

    expect(createdUserBalance).toHaveProperty('id');
  });

  it('should  be able to update the user balance data', async () => {
    const fakeBalanceRepository = new FakeBalanceRepository();
    const getUserBalance = new GetUserBalanceService(fakeBalanceRepository);

    await getUserBalance.execute({
      accessToken: 'efs54325kh3df',
      current: '54',
      future: '34',
      date: new Date(),
      moipAccountId: '89sagassa90uas',
      unavailable: '45',
      userId: 3,
    });

    const updatedBalance = await getUserBalance.execute({
      accessToken: 'efs54325kh3df',
      current: '545',
      future: '344',
      date: new Date(),
      moipAccountId: '89sagassa90uas',
      unavailable: '445',
      userId: 3,
    });

    expect(updatedBalance.current).toBe('545');
    expect(updatedBalance.userId).toBe(3);
  });
});
