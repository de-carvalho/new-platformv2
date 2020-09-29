import ISupporterLoanSituationDTO from '@modules/users/dtos/ISetSupporterLoanSituationDTO';
import SupporterLoanSituation from '../infra/typeorm/entities/SupporterLoanSituation';

export default interface ISupporterLoanSituationRepository {
  findUser(
    userId: number,
    projectId: number,
  ): Promise<SupporterLoanSituation | undefined>;
  findInstallment(
    userId: number,
    projectId: number,
    installment: number,
  ): Promise<SupporterLoanSituation | undefined>;
  create(data: ISupporterLoanSituationDTO): Promise<void>;
  save(user: SupporterLoanSituation): Promise<void>;
  getUserData(userId: number): Promise<SupporterLoanSituation[] | undefined>;
}
