import User from '@modules/users/infra/typeorm/entities/User';
import Balance from '@modules/balance/infra/typeorm/entities/Balance';
import ProjectBalance from '@modules/projects/infra/typeorm/entities/ProjectBalance';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import Transfers from '../infra/typeorm/entities/Transfers';
import ICreateTransfersDTO from '../dtos/ICreateTransfersDTO';

export default interface ITransfersRepository {
  create(data: ICreateTransfersDTO): Promise<Transfers>;
  findUser(taxDocumentNumber: string, email: string): Promise<User | undefined>;
  findUserById(userId: number): Promise<User | undefined>;
  checkUserBalance(userId: number): Promise<Balance | undefined>;
  checkProjectBalance(projectId: number): Promise<ProjectBalance | undefined>;
  findProject(projectId: number): Promise<Project | undefined>;
}
