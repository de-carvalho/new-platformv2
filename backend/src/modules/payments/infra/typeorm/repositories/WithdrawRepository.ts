import { getRepository, Repository } from 'typeorm';

import IWithdrawRepository from '@modules/payments/repositories/IWithdrawRepository';
import IWithdrawDTO from '@modules/payments/dtos/IWithdrawDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import Withdraw from '../entities/Withdraw';

class WithdrawRepository implements IWithdrawRepository {
  private ormRepository: Repository<Withdraw>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Withdraw);
    this.usersRepository = getRepository(User);
  }

  public async findUserById(id: number): Promise<User | undefined> {
    const findUser = await this.usersRepository.findOne(id);

    return findUser;
  }

  public async create(data: IWithdrawDTO): Promise<Withdraw> {
    const withdraw = this.ormRepository.create(data);

    await this.ormRepository.save(withdraw);

    return withdraw;
  }

  public async save(data: Withdraw): Promise<Withdraw> {
    return this.ormRepository.save(data);
  }

  public async getStatement(
    userId: number,
    projectId: number,
  ): Promise<Withdraw | undefined> {
    const stament = await this.ormRepository.findOne({
      userId,
      projectId,
    });

    return stament;
  }

  public async getAllStatements(): Promise<Withdraw[] | undefined> {
    const stament = await this.ormRepository.find();

    return stament;
  }
}

export default WithdrawRepository;
