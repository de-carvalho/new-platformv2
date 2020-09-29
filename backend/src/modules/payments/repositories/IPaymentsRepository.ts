import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import Payment from '../infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';

export default interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>;
  findProject(projectId: number): Promise<Project | undefined>;
  findUser(userId: number): Promise<User | undefined>;
  updateProject(data: Project): Promise<Project>;
}
