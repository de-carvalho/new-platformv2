import { getRepository, Repository } from 'typeorm';

import IAdminFirgunTeamRepository from '@modules/users/repositories/IAdminFirgunTeamRepository';
import IAdminFirgunTeamDTO from '@modules/users/dtos/IAdminFirgunTeamDTO';
import User from '@modules/users/infra/typeorm/entities/User';

import AdminFirgunTeam from '../../entities/AdminFirgunTeam';

class AdminFirgunTeamRepository implements IAdminFirgunTeamRepository {
  private ormRepository: Repository<AdminFirgunTeam>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(AdminFirgunTeam);
    this.usersRepository = getRepository(User);
  }

  public async findUser(userId: number): Promise<AdminFirgunTeam | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
    });

    return user;
  }

  public async delete(memberId: number): Promise<void> {
    await this.ormRepository.delete(memberId);
  }

  public async findLoggedUser(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return user;
  }

  public async getTeam(): Promise<AdminFirgunTeam[]> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async findUserByEmail(
    email: string,
  ): Promise<AdminFirgunTeam | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: IAdminFirgunTeamDTO): Promise<AdminFirgunTeam> {
    const data = this.ormRepository.create(userData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(user: AdminFirgunTeam): Promise<AdminFirgunTeam> {
    const updatedData = this.ormRepository.save(user);

    return updatedData;
  }
}

export default AdminFirgunTeamRepository;
