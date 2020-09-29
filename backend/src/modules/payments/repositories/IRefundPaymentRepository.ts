import Project from '@modules/projects/infra/typeorm/entities/Project';
import EntrepreneurBankStatement from '@modules/users/infra/typeorm/entities/EntrepreneurBankStatement';
import RefundPayment from '../infra/typeorm/entities/RefundPayment';
import ICreatePaymentDTO from '../dtos/ICreateRefundDTO';

export default interface IRefundRepository {
  create(data: ICreatePaymentDTO): Promise<RefundPayment>;
  findProject(projectId: number): Promise<Project | undefined>;
  updateProject(data: Project): Promise<Project>;
  findProjectStatement(
    userId: number,
    projectId: number,
    installment: number,
  ): Promise<EntrepreneurBankStatement | undefined>;
}
