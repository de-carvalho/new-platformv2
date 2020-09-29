import ISupporterProfileDTO from '@modules/users/dtos/ISupporterProfileDTO';
import SupporterProfile from '../infra/typeorm/entities/SupporterProfile';

export default interface ISupporterProfileRepository {
  create(data: ISupporterProfileDTO): Promise<SupporterProfile>;
  save(user: SupporterProfile): Promise<SupporterProfile>;
  getUserData(userId: number): Promise<SupporterProfile | undefined>;
  findById(userId: number): Promise<SupporterProfile | undefined>;
}
