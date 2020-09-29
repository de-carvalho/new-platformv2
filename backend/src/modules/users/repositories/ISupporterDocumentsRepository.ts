import ISupporterDocumentsDTO from '@modules/users/dtos/ISupporterDocumentsDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import SupporterDocuments from '../infra/typeorm/entities/SupporterDocuments';

export default interface ISupporterBankStatementRepository {
  create(data: ISupporterDocumentsDTO): Promise<SupporterDocuments>;
  save(user: SupporterDocuments): Promise<SupporterDocuments>;
  getUserData(userId: number): Promise<SupporterDocuments | undefined>;
  findById(userId: number): Promise<SupporterDocuments | undefined>;
  findUser(userId: number): Promise<User | undefined>;
}
