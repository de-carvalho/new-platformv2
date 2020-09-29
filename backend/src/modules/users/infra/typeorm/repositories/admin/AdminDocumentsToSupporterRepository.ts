import { getRepository, Repository } from 'typeorm';

import IAdminDocumentsToSupporterRepository from '@modules/users/repositories/IAdminDocumentsToSupporterRepository';
import IAdminDocumentsToSupporterDTO from '@modules/users/dtos/IAdminDocumentsToSupporterDTO';
import User from '@modules/users/infra/typeorm/entities/User';

import AdminDocumentsToSupporter from '../../entities/AdminDocumentsToSupporter';

class AdminDocumentsToSupporterRepository
  implements IAdminDocumentsToSupporterRepository {
  private ormRepository: Repository<AdminDocumentsToSupporter>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(AdminDocumentsToSupporter);
    this.usersRepository = getRepository(User);
  }

  public async findUser(
    userId: number,
  ): Promise<AdminDocumentsToSupporter | undefined> {
    const user = await this.ormRepository.findOne({
      where: { userId },
    });

    return user;
  }

  public async findUserById(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return user;
  }

  public async getUserData(
    userId: number,
  ): Promise<AdminDocumentsToSupporter | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId },
    });

    return userData;
  }

  public async create(
    userData: IAdminDocumentsToSupporterDTO,
  ): Promise<AdminDocumentsToSupporter> {
    const data = this.ormRepository.create(userData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(
    user: AdminDocumentsToSupporter,
  ): Promise<AdminDocumentsToSupporter> {
    const updatedData = this.ormRepository.save(user);

    return updatedData;
  }
}

export default AdminDocumentsToSupporterRepository;
