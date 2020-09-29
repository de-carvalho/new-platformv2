import ISupporterBankStatementDTO from '@modules/users/dtos/ISetSupporterBankStatementDTO';
import SupporterBankStatement from '../infra/typeorm/entities/SupporterBankStatement';

export default interface ISupporterBankStatementRepository {
  create(data: ISupporterBankStatementDTO): Promise<void>;
  save(user: SupporterBankStatement): Promise<void>;
  getUserData(userId: number): Promise<SupporterBankStatement[] | undefined>;
}
