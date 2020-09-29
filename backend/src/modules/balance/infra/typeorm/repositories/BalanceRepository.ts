import { getRepository, Repository } from 'typeorm';

import IBalanceRepository from '@modules/balance/repositories/IGetAccountBalanceRepository';
import IGetAccountBalanceDTO from '@modules/balance/dtos/IGetAccountBalanceDTO';

import Balance from '../entities/Balance';

class BalanceRepository implements IBalanceRepository {
  private ormRepository: Repository<Balance>;

  constructor() {
    this.ormRepository = getRepository(Balance);
  }

  public async findById(userId: number): Promise<Balance | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { userId },
    });

    return findUser;
  }

  public async create(data: IGetAccountBalanceDTO): Promise<Balance> {
    const balance = this.ormRepository.create(data);

    await this.ormRepository.save(balance);

    return balance;
  }

  public async update(data: Balance): Promise<Balance> {
    return this.ormRepository.save(data);
  }
}

export default BalanceRepository;
