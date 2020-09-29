import IUsersRepository from '@modules/users/repositories/IUserPFRepository';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUserPFRepository implements IUsersRepository {
  private ormRepository: User[] = [];

  public async findById(id: number): Promise<User | undefined> {
    const findUser = this.ormRepository.find(item => item.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.ormRepository.find(item => item.email === email);

    return findUser;
  }

  // Lista os dados do usuário
  public async getUserData(userId: number): Promise<User | undefined> {
    const findUser = this.ormRepository.find(item => item.id === userId);

    return findUser;
  }

  public async findByDocNumber(
    taxDocumentNumber: string,
  ): Promise<User | undefined> {
    const findUser = this.ormRepository.find(
      item => item.taxDocumentNumber === taxDocumentNumber,
    );

    return findUser;
  }

  public async findByEmailAndDocNumber(
    email: string,
    taxDocumentNumber: string,
  ): Promise<User | undefined> {
    const findUser = this.ormRepository.find(
      item =>
        item.taxDocumentNumber === taxDocumentNumber && item.email === email,
    );

    return findUser;
  }

  public async create(userData: ICreateUserPFDTO): Promise<User> {
    const user = new User();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(user, { id }, userData);

    this.ormRepository.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    this.ormRepository.push(user);

    return user;
  }
}

export default FakeUserPFRepository;
