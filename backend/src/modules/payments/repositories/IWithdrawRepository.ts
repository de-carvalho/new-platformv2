import User from '@modules/users/infra/typeorm/entities/User';
import Withdraw from '../infra/typeorm/entities/Withdraw';
import IWithdrawDTO from '../dtos/IWithdrawDTO';

export default interface IWithdrawRepository {
  create(data: IWithdrawDTO): Promise<Withdraw>;
  save(data: Withdraw): Promise<Withdraw>;
  findUserById(userId: number): Promise<User | undefined>;
  getStatement(
    userId: number,
    projectId: number,
  ): Promise<Withdraw | undefined>;
  getAllStatements(): Promise<Withdraw[] | undefined>;
}
