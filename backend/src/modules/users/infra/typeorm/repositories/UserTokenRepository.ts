import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import IUsersTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(userId: number): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userId,
      token: uuid(),
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
