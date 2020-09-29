import { getRepository, Repository } from 'typeorm';

import IAdminAboutFirgunRepository from '@modules/users/repositories/IAdminAboutFirgunRepository';
import IAdminAboutFirgunDTO from '@modules/users/dtos/IAdminAboutFirgunDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import AdminAboutFirgun from '../../entities/AdminAboutFirgun';

class AdminAboutFirgunRepository implements IAdminAboutFirgunRepository {
  private ormRepository: Repository<AdminAboutFirgun>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(AdminAboutFirgun);
    this.usersRepository = getRepository(User);
  }

  public async getData(): Promise<AdminAboutFirgun | undefined> {
    const data = await this.ormRepository.findOne();

    return data;
  }

  public async findLoggedUser(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(userId);

    return user;
  }

  public async create(data: IAdminAboutFirgunDTO): Promise<AdminAboutFirgun> {
    const createdData = this.ormRepository.create(data);

    await this.ormRepository.save(createdData);

    return createdData;
  }

  public async save(user: AdminAboutFirgun): Promise<AdminAboutFirgun> {
    const updatedData = this.ormRepository.save(user);

    return updatedData;
  }
}

export default AdminAboutFirgunRepository;
