import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUserPJRepository';
import ICreateUserPJDTO from '@modules/users/dtos/ICreateUserPJDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '../entities/User';

class UserPJRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  private projectsRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(User);
    this.projectsRepository = getRepository(Project);
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  // Lista os dados do usuário
  public async getUserData(userId: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  // Lista todos os empreendedores aprovados de um parceiro
  public async getApprovedEntrepreneurs(
    partnerId: number,
  ): Promise<User[] | undefined> {
    const findEntrepreneurs = await this.ormRepository.find({
      where: {
        partnerId,
        partnerConfirmed: true,
      },
    });

    return findEntrepreneurs;
  }

  // Lista todos os projetos concluidos apoiados por um parceiro
  public async getProjectsSupportedCompleted(
    partnerId: number,
  ): Promise<Project[] | undefined> {
    const findProjects = await this.projectsRepository.find({
      where: {
        partnerId,
        state: 'COMPLETED',
      },
    });

    return findProjects;
  }

  // Lista todos os projetos em andamento apoiados por um parceiro
  public async getProjectsSupportedInProgress(
    partnerId: number,
  ): Promise<Project[] | undefined> {
    const findProjects = await this.projectsRepository.find({
      where: {
        partnerId,
        state: 'CATCHING',
      },
    });

    return findProjects;
  }

  // Lista todos os empreendedores a serem aprovados por um parceiro
  public async getEntrepreneursToApprove(
    partnerId: number,
  ): Promise<User[] | undefined> {
    const findEntrepreneurs = await this.ormRepository.find({
      where: {
        partnerId,
        partnerConfirmed: false,
      },
    });

    return findEntrepreneurs;
  }

  public async findByDocNumber(
    taxDocumentNumber: string,
  ): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        taxDocumentNumber,
      },
    });

    return findUser;
  }

  public async findByEmailAndDocNumber(
    email: string,
    taxDocumentNumber: string,
  ): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
        taxDocumentNumber,
      },
    });

    return findUser;
  }

  public async getAllPartners(role: string): Promise<User[] | undefined> {
    const findPartners = await this.ormRepository.find({
      where: {
        role,
      },
    });

    return findPartners;
  }

  public async create(userData: ICreateUserPJDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserPJRepository;
