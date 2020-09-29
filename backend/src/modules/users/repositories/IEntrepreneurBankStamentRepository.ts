import IEntrepreneurBankStatementDTO from '@modules/users/dtos/IEntrepreneurBankStatementDTO';
import EntrepreneurBankStatement from '../infra/typeorm/entities/EntrepreneurBankStatement';

export default interface IEntrepreneurBankStatementRepository {
  create(data: IEntrepreneurBankStatementDTO): Promise<void>;
  save(user: EntrepreneurBankStatement): Promise<void>;
  getUserData(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneurBankStatement[] | undefined>;
  findByInstallment(
    userId: number,
    installment: number,
    projectId: number,
  ): Promise<EntrepreneurBankStatement | undefined>;
  getUserDataToPay(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneurBankStatement[]>;
}
