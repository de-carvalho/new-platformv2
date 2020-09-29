import IBalanceRepository from '@modules/balance/repositories/IGetAccountBalanceRepository';
import IGetAccountBalanceDTO from '@modules/balance/dtos/IGetAccountBalanceDTO';

import Balance from '../../infra/typeorm/entities/Balance';

class FakeBalanceRepository implements IBalanceRepository {
  private ormRepository: Balance[] = [];

  public async findById(userId: number): Promise<Balance | undefined> {
    const findUser = this.ormRepository.find(item => item.userId === userId);

    return findUser;
  }

  public async create(data: IGetAccountBalanceDTO): Promise<Balance> {
    const balance = new Balance();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(balance, { id }, data);

    this.ormRepository.push(balance);

    return balance;
  }

  public async update(data: Balance): Promise<Balance> {
    this.ormRepository.push(data);

    return data;
  }
}

export default FakeBalanceRepository;
