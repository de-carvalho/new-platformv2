import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUserPFRepository';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';

import User from '../entities/User';

class UserPFRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async checkByEmail(
    email: string,
    role: string,
    accountType: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      email,
      role,
      accountType,
    });

    return user;
  }

  // Lista os dados do usuário
  public async getUserData(userId: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
    });

    return user;
  }

  public async findByDocNumber(
    taxDocumentNumber: string,
    role: string,
    accountType: string,
  ): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      taxDocumentNumber,
      role,
      accountType,
    });

    return findUser;
  }

  public async findByEmailAndDocNumber(
    email: string,
    taxDocumentNumber: string,
    role: string,
    accountType: string,
  ): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      email,
      taxDocumentNumber,
      role,
      accountType,
    });

    return findUser;
  }

  public async create(userData: ICreateUserPFDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserPFRepository;
