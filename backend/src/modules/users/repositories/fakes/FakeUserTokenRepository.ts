import { uuid } from 'uuidv4';

import IUsersTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUsersTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: number): Promise<UserToken> {
    const userToken = new UserToken();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);

    Object.assign(userToken, {
      id,
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokenRepository;
