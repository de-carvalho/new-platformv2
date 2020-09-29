import { getRepository, Repository } from 'typeorm';

import ISupporterLoanSituationRepository from '@modules/users/repositories/ISupporterLoanSituationRepository';
import ISupporterLoanSituationDTO from '@modules/users/dtos/ISetSupporterLoanSituationDTO';

import SupporterLoanSituation from '../../entities/SupporterLoanSituation';

class SupporterLoanSituationRepository
  implements ISupporterLoanSituationRepository {
  private ormRepository: Repository<SupporterLoanSituation>;

  constructor() {
    this.ormRepository = getRepository(SupporterLoanSituation);
  }

  public async findUser(
    userId: number,
    projectId: number,
  ): Promise<SupporterLoanSituation | undefined> {
    const findInvestor = await this.ormRepository.findOne({
      where: { userId, projectId },
    });

    return findInvestor;
  }

  public async findInstallment(
    userId: number,
    projectId: number,
    installment: number,
  ): Promise<SupporterLoanSituation | undefined> {
    const findData = await this.ormRepository.findOne({
      where: { userId, projectId, installmentPayed: installment },
    });

    return findData;
  }

  // Lista os dados do usuário
  public async getUserData(
    userId: number,
  ): Promise<SupporterLoanSituation[] | undefined> {
    const user = await this.ormRepository.find({
      where: { userId },
    });

    return user;
  }

  // Cadastra no banco de dados os dados da situação do investimento de um investidor
  public async create(userData: ISupporterLoanSituationDTO): Promise<void> {
    const loanSituation = this.ormRepository.create(userData);

    await this.ormRepository.save(loanSituation);
  }

  // Salva/edita os da situação do investimento de um investidor
  public async save(user: SupporterLoanSituation): Promise<void> {
    this.ormRepository.save(user);
  }
}

export default SupporterLoanSituationRepository;
