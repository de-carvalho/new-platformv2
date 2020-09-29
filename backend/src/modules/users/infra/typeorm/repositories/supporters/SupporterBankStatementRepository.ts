import { getRepository, Repository } from 'typeorm';

import ISupporterBankStatementRepository from '@modules/users/repositories/ISupporterBankStatementRepository';
import ISupporterBankStatementDTO from '@modules/users/dtos/ISetSupporterBankStatementDTO';

import SupporterBankStatement from '../../entities/SupporterBankStatement';

class SupporterBankStatementRepository
  implements ISupporterBankStatementRepository {
  private ormRepository: Repository<SupporterBankStatement>;

  constructor() {
    this.ormRepository = getRepository(SupporterBankStatement);
  }

  // Lista os dados do usuário
  public async getUserData(
    userId: number,
  ): Promise<SupporterBankStatement[] | undefined> {
    const userData = await this.ormRepository.find({
      where: { userId },
    });

    return userData;
  }

  // Cadastra no banco de dados os dadosdo extrato bancário do investidor
  public async create(userData: ISupporterBankStatementDTO): Promise<void> {
    const bankStatement = this.ormRepository.create(userData);

    await this.ormRepository.save(bankStatement);
  }

  // Salva/edita os dados do extrato bancário do investidor
  public async save(user: SupporterBankStatement): Promise<void> {
    this.ormRepository.save(user);
  }
}

export default SupporterBankStatementRepository;
