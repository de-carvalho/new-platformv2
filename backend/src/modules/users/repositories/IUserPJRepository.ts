import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserPJDTO';
import ICreateGeneralUserDTO from '../dtos/ICreateGeneralPJUsers';

export default interface IUsersRepository {
  findById(id: number): Promise<User | undefined>;
  findByEmail(
    email: string,
    role: string,
    accountType: string,
  ): Promise<User | undefined>;
  findByDocNumber(
    taxDocumentNumber: string,
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
  getApprovedEntrepreneurs(partnerId: number): Promise<User[] | undefined>;
  getEntrepreneursToApprove(partnerId: number): Promise<User[] | undefined>;
  getProjectsSupportedCompleted(
    partnerId: number,
  ): Promise<Project[] | undefined>;
  getProjectsSupportedInProgress(
    partnerId: number,
  ): Promise<Project[] | undefined>;
  getAllPartners(role: string): Promise<User[] | undefined>;
}
