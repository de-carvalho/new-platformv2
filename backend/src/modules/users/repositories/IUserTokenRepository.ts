import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(userId: number): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
