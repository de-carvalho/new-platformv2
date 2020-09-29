import { getRepository, Repository } from 'typeorm';

import ISupporterProfileRepository from '@modules/users/repositories/ISupporterProfileRepository';
import ISupporterProfileDTO from '@modules/users/dtos/ISupporterProfileDTO';

import SupporterProfile from '../../entities/SupporterProfile';

class SupporterProfileRepository implements ISupporterProfileRepository {
  private ormRepository: Repository<SupporterProfile>;

  constructor() {
    this.ormRepository = getRepository(SupporterProfile);
  }

  public async getUserData(
    userId: number,
  ): Promise<SupporterProfile | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId },
    });

    return userData;
  }

  public async findById(userId: number): Promise<SupporterProfile | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { userId },
    });

    return findUser;
  }

  public async create(data: ISupporterProfileDTO): Promise<SupporterProfile> {
    const userDocuments = this.ormRepository.create(data);

    await this.ormRepository.save(userDocuments);

    return userDocuments;
  }

  // Salva/edita os dados do investidor
  public async save(userData: SupporterProfile): Promise<SupporterProfile> {
    const userDocuments = this.ormRepository.save(userData);

    return userDocuments;
  }
}

export default SupporterProfileRepository;
