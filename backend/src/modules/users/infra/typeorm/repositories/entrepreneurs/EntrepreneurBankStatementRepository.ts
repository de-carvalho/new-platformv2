import { getRepository, Repository } from 'typeorm';

import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';
import IEntrepreneurBankStatementDTO from '@modules/users/dtos/IEntrepreneurBankStatementDTO';

import EntrepreneurBankStatement from '../../entities/EntrepreneurBankStatement';

class EntrepreneurBankStatementRepository
  implements IEntrepreneurBankStatementRepository {
  private ormRepository: Repository<EntrepreneurBankStatement>;

  constructor() {
    this.ormRepository = getRepository(EntrepreneurBankStatement);
  }

  // Lista os dados do usuário
  public async getUserData(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneurBankStatement[] | undefined> {
    const userData = await this.ormRepository.find({
      where: { userId, projectId },
    });

    return userData;
  }

  public async getUserDataToPay(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneurBankStatement[]> {
    const userData = await this.ormRepository.find({
      where: { userId, projectId, state: 'A pagar' },
    });

    return userData;
  }

  public async findByInstallment(
    userId: number,
    installment: number,
    projectId: number,
  ): Promise<EntrepreneurBankStatement | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId, installment, projectId },
    });

    return userData;
  }

  public async create(userData: IEntrepreneurBankStatementDTO): Promise<void> {
    const bankStatement = this.ormRepository.create(userData);

    await this.ormRepository.save(bankStatement);
  }

  public async save(user: EntrepreneurBankStatement): Promise<void> {
    this.ormRepository.save(user);
  }
}

export default EntrepreneurBankStatementRepository;
