import AppError from '@shared/errors/AppErrors';

import FakeTransfersRepository from '../../repositories/fakes/FakeTransfersRepository';
import CheckUserBalanceService from '../CheckUserBalanceService';
import FakeCreateTransfersService from '../fakes/FakeCreateTransfersService';

let faketransfersRepository: FakeTransfersRepository;
let fakeCreateTransfers: FakeCreateTransfersService;
let checkUserBalance: CheckUserBalanceService;

describe('CheckUserBalanceService', () => {
  beforeEach(() => {
    faketransfersRepository = new FakeTransfersRepository();
    fakeCreateTransfers = new FakeCreateTransfersService(
      faketransfersRepository,
    );
    checkUserBalance = new CheckUserBalanceService(faketransfersRepository);
  });

  it('should be able to check the user balance if it is less or equal than 0', async () => {
    await fakeCreateTransfers.createUserBalance({
      accessToken: 'efs54325kh3df',
      current: '0',
      future: '0',
      date: new Date(),
      moipAccountId: '89sagassa90uas',
      unavailable: '45',
      userId: 3,
    });

    expect(checkUserBalance.execute(3, '440')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check if the value that will be payeed is bigger than the current balance', async () => {
    await fakeCreateTransfers.createUserBalance({
      accessToken: 'efs54325kh3df',
      current: '40',
      future: '40',
      date: new Date(),
      moipAccountId: '89sagassa90uas',
      unavailable: '45',
      userId: 3,
    });

    expect(checkUserBalance.execute(3, '440')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check and return the current balance', async () => {
    await fakeCreateTransfers.createUserBalance({
      accessToken: 'efs54325kh3df',
      current: '400',
      future: '40',
      date: new Date(),
      moipAccountId: '89sagassa90uas',
      unavailable: '45',
      userId: 3,
    });

    expect(await checkUserBalance.execute(3, '10')).toHaveProperty('id');
  });
});
