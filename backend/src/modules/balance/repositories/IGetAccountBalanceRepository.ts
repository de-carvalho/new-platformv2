import Balance from '../infra/typeorm/entities/Balance';
import IGetAccountBalanceDTO from '../dtos/IGetAccountBalanceDTO';

export default interface IAccountBalanceRepository {
  create(data: IGetAccountBalanceDTO): Promise<Balance>;
  findById(userId: number): Promise<Balance | undefined>;
  update(data: Balance): Promise<Balance>;
}
