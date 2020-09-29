import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserPFDTO';
import ICreateGeneralUserDTO from '../dtos/ICreateGeneralPFUsers';

export default interface IUsersRepository {
  findById(id: number): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByDocNumber(
    taxDocumentNumber: string,
    role: string,
    accountType: string,
  ): Promise<User | undefined>;
  checkByEmail(
    email: string,
    role: string,
    accountType: string,
  ): Promise<User | undefined>;
  findByEmailAndDocNumber(
    email: string,
    taxDocumentNumber: string,
    role: string,
    accountType: string,
  ): Promise<User | undefined>;
  create(data: ICreateUserDTO | ICreateGeneralUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  getUserData(userId: number): Promise<User | undefined>;
}
