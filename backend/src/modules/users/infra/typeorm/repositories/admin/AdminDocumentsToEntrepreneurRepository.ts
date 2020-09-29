import { getRepository, Repository } from 'typeorm';

import IAdminDocumentsToEntrepreneurRepository from '@modules/users/repositories/IAdminDocumentToEntrepreneurRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Project from '@modules/projects/infra/typeorm/entities/Project';

import AdminDocumentsToEntrepreneur from '../../entities/AdminDocumentsToEntrepreneur';

interface IDocumentDTO {
  contract: string;
  userId: number;
  projectId: number;
}
class AdminDocumentsToEntrepreneurRepository
  implements IAdminDocumentsToEntrepreneurRepository {
  private ormRepository: Repository<AdminDocumentsToEntrepreneur>;

  private usersRepository: Repository<User>;

  private projectsRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(AdminDocumentsToEntrepreneur);
    this.usersRepository = getRepository(User);
    this.projectsRepository = getRepository(Project);
  }

  public async findUser(
    userId: number,
    projectId: number,
  ): Promise<AdminDocumentsToEntrepreneur | undefined> {
    const user = await this.ormRepository.findOne({
      where: { userId, projectId },
    });

    return user;
  }

  public async findUserById(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return user;
  }

  public async findProject(projectId: number): Promise<Project | undefined> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });

    return project;
  }

  public async getUserData(
    userId: number,
    projectId: number,
  ): Promise<AdminDocumentsToEntrepreneur | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { userId, projectId },
    });

    return userData;
  }

  public async create(
    userData: IDocumentDTO,
  ): Promise<AdminDocumentsToEntrepreneur> {
    const data = this.ormRepository.create(userData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(
    user: AdminDocumentsToEntrepreneur,
  ): Promise<AdminDocumentsToEntrepreneur> {
    const updatedData = this.ormRepository.save(user);

    return updatedData;
  }
}

export default AdminDocumentsToEntrepreneurRepository;
