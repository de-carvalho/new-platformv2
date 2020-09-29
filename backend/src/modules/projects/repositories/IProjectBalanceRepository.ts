import Balance from '../infra/typeorm/entities/ProjectBalance';
import Project from '../infra/typeorm/entities/Project';
import IProjectBalanceDTO from '../dtos/IProjectBalanceDTO';

export default interface IProjecBalanceRepository {
  create(data: IProjectBalanceDTO): Promise<Balance>;
  findById(projectId: number): Promise<Balance | undefined>;
  update(data: Balance): Promise<Balance>;
  findProject(projectId: number): Promise<Project | undefined>;
}
