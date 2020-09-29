import { getRepository, Repository } from 'typeorm';

import ISupporterDocumentsRepository from '@modules/users/repositories/ISupporterDocumentsRepository';
import ISupporterDocumentsDTO from '@modules/users/dtos/ISupporterDocumentsDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import SupporterDocuments from '../../entities/SupporterDocuments';

class SupporterDocumentsRepository implements ISupporterDocumentsRepository {
  private ormRepository: Repository<SupporterDocuments>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(SupporterDocuments);
    this.usersRepository = getRepository(User);
  }

  // Lista os documentos do usuário
  public async getUserData(
    userId: number,
  ): Promise<SupporterDocuments | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId },
    });

    return userData;
  }

  public async findUser(userId: number): Promise<User | undefined> {
    const findUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return findUser;
  }

  public async findById(
    userId: number,
  ): Promise<SupporterDocuments | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { userId },
      loadEagerRelations: true,
    });

    return findUser;
  }

  // Cadastra no banco de dados os documentos do investidor
  public async create(
    data: ISupporterDocumentsDTO,
  ): Promise<SupporterDocuments> {
    const userDocuments = this.ormRepository.create(data);

    await this.ormRepository.save(userDocuments);

    return userDocuments;
  }

  // Salva/edita os documentos do investidor
  public async save(userData: SupporterDocuments): Promise<SupporterDocuments> {
    const userDocuments = this.ormRepository.save(userData);

    return userDocuments;
  }
}

export default SupporterDocumentsRepository;
