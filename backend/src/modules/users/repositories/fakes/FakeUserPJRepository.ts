import IUsersRepository from '@modules/users/repositories/IUserPJRepository';
import ICreateUserPJDTO from '@modules/users/dtos/ICreateUserPJDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '../../infra/typeorm/entities/User';

class FakeUserPJRepository implements IUsersRepository {
  private ormRepository: User[] = [];

  private projectsRepository: Project[] = [];

  public async findById(id: number): Promise<User | undefined> {
    const findUser = this.ormRepository.find(item => item.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.ormRepository.find(item => item.email === email);

    return findUser;
  }

  // Lista os dados do usuário
  public async getUserData(userId: number): Promise<User | undefined> {
    const findUser = this.ormRepository.find(item => item.id === userId);

    return findUser;
  }

  // Lista todos os empreendedores aprovados de um parceiro
  public async getApprovedEntrepreneurs(
    partnerId: number,
  ): Promise<User[] | undefined> {
    const entrepreneurs: User[] = [];

    this.ormRepository.forEach(item => {
      if (item.partnerId === partnerId && item.partnerConfirmed === true) {
        entrepreneurs.push(item);
      }
    });

    return entrepreneurs;
  }

  // Lista todos os projetos concluidos apoiados por um parceiro
  public async getProjectsSupportedCompleted(
    partnerId: number,
  ): Promise<Project[] | undefined> {
    const projects: Project[] = [];

    this.projectsRepository.forEach(item => {
      if (
        // eslint-disable-next-line radix
        item.partnerId === partnerId &&
        item.state === 'COMPLETED'
      ) {
        projects.push(item);
      }
    });

    return projects;
  }

  // Lista todos os projetos em andamento apoiados por um parceiro
  public async getProjectsSupportedInProgress(
    partnerId: number,
  ): Promise<Project[] | undefined> {
    const projects: Project[] = [];

    this.projectsRepository.forEach(item => {
      if (
        // eslint-disable-next-line radix
        item.partnerId === partnerId &&
        item.state === 'CATCHING'
      ) {
        projects.push(item);
      }
    });

    return projects;
  }

  // Lista todos os empreendedores a serem aprovados por um parceiro
  public async getEntrepreneursToApprove(
    partnerId: number,
  ): Promise<User[] | undefined> {
    const entrepreneurs: User[] = [];

    this.ormRepository.forEach(item => {
      if (item.partnerId === partnerId && item.partnerConfirmed === false) {
        entrepreneurs.push(item);
      }
    });

    return entrepreneurs;
  }

  public async findByDocNumber(
    taxDocumentNumber: string,
  ): Promise<User | undefined> {
    const findUser = this.ormRepository.find(
      item => item.taxDocumentNumber === taxDocumentNumber,
    );

    return findUser;
  }

  public async findByEmailAndDocNumber(
    email: string,
    taxDocumentNumber: string,
  ): Promise<User | undefined> {
    const findUser = this.ormRepository.find(
      item =>
        item.taxDocumentNumber === taxDocumentNumber && item.email === email,
    );

    return findUser;
  }

  public async getAllPartners(role: string): Promise<User[] | undefined> {
    const partners: User[] = [];

    this.ormRepository.forEach(item => {
      if (item.role === role) {
        partners.push(item);
      }
    });

    return partners;
  }

  public async create(userData: ICreateUserPJDTO): Promise<User> {
    const user = new User();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(user, { id }, userData);

    this.ormRepository.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    this.ormRepository.push(user);

    return user;
  }
}

export default FakeUserPJRepository;
