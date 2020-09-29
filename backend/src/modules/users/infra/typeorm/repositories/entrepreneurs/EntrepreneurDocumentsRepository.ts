import { getRepository, Repository } from 'typeorm';

import IEntrepreneursDocumentsRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';
import IEntrepreneursDocumentsDTO from '@modules/users/dtos/IEntrepreneurDocumentDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import EntrepreneursDocuments from '../../entities/EntrepreneursDocuments';

class SupporterDocumentsRepository
  implements IEntrepreneursDocumentsRepository {
  private ormRepository: Repository<EntrepreneursDocuments>;

  private projectRepository: Repository<Project>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(EntrepreneursDocuments);
    this.projectRepository = getRepository(Project);
    this.usersRepository = getRepository(User);
  }

  // Lista os documentos do usuário
  public async getUserData(
    userId: number,
  ): Promise<EntrepreneursDocuments | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId },
    });

    return userData;
  }

  public async findByIds(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneursDocuments | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { userId, projectId },
      loadEagerRelations: true,
    });

    return findUser;
  }

  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProject = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    return findProject;
  }

  public async findUser(userId: number): Promise<User | undefined> {
    const findUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return findUser;
  }

  public async create(
    documents: IEntrepreneursDocumentsDTO,
  ): Promise<EntrepreneursDocuments> {
    const userDocument = this.ormRepository.create(documents);

    await this.ormRepository.save(userDocument);

    return userDocument;
  }

  public async save(
    userData: EntrepreneursDocuments,
  ): Promise<EntrepreneursDocuments> {
    const userDocuments = this.ormRepository.save(userData);

    return userDocuments;
  }
}

export default SupporterDocumentsRepository;
