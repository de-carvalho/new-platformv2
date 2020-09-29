import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IProjectSupporterDTO from '@modules/projects/dtos/IProjectSupportersDTO';
import ICreateUserPFDTO from '@modules/users/dtos/ICreateUserPFDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import Project from '../../infra/typeorm/entities/Project';
import ProjectSupporter from '../../infra/typeorm/entities/ProjectSupporter';

class FakeProjectsRepositories implements IProjectsRepository {
  private ormRepository: Project[] = [];

  private userRepository: User[] = [];

  private supporterRepository: ProjectSupporter[] = [];

  public async findByStatus(
    state: string,
    paymentState: string,
    entrepreneurId: number,
  ): Promise<Project | undefined> {
    let projects;
    this.ormRepository.forEach(item => {
      // eslint-disable-next-line no-unused-expressions
      if (
        item.state === state &&
        item.paymentState === paymentState &&
        item.entrepreneurId === entrepreneurId
      ) {
        projects = item;
      }
    });

    return projects;
  }

  public async findUser(userId: number): Promise<User | undefined> {
    const findUser = this.userRepository.find(item => item.id === userId);

    return findUser;
  }

  public async getProjectsInProgress(
    state: string,
  ): Promise<Project[] | undefined> {
    const projects: Project[] = [];

    this.ormRepository.forEach(item => {
      // eslint-disable-next-line no-unused-expressions
      if (item.state === state && item.projectType === 1) {
        projects.push(item);
      }
    });

    return projects;
  }

  public async createProject(data: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(project, { id }, data);

    this.ormRepository.push(project);

    return project;
  }

  public async createUser(data: ICreateUserPFDTO): Promise<User> {
    const user = new User();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(user, { id }, data);

    this.userRepository.push(user);

    return user;
  }

  public async getFirgunProjects(
    projectType: number,
    state: string,
  ): Promise<Project[] | undefined> {
    const projects: Project[] = [];

    this.ormRepository.forEach(item => {
      // eslint-disable-next-line no-unused-expressions
      if (item.state === state && item.projectType === projectType) {
        projects.push(item);
      }
    });

    return projects;
  }

  public async getProjectsCompleted(
    state: string,
  ): Promise<Project[] | undefined> {
    const projects: Project[] = [];

    this.ormRepository.forEach(item => {
      // eslint-disable-next-line no-unused-expressions
      if (item.state === state) {
        projects.push(item);
      }
    });

    return projects;
  }

  public async getUserProjectsInProgress(
    entrepreneurId: number,
  ): Promise<Project | undefined> {
    let project;

    this.ormRepository.forEach(item => {
      // eslint-disable-next-line no-unused-expressions
      if (item.state === 'CATCHING' && item.entrepreneurId === entrepreneurId) {
        project = item;
      }
    });

    return project;
  }

  public async getUserProjectsCompleted(
    state: string,
    entrepreneurId: number,
  ): Promise<Project[] | undefined> {
    const projects: Project[] = [];

    this.ormRepository.forEach(item => {
      // eslint-disable-next-line no-unused-expressions
      if (item.state === state && item.entrepreneurId === entrepreneurId) {
        projects.push(item);
      }
    });

    return projects;
  }

  public async findById(id: number): Promise<Project | undefined> {
    const findProject = this.ormRepository.find(item => item.id === id);

    return findProject;
  }

  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(project, { id }, data);

    this.ormRepository.push(project);

    return project;
  }

  public async findUserById(userId: number): Promise<User | undefined> {
    const findUser = this.userRepository.find(item => item.id === userId);

    return findUser;
  }

  public async findSupporterById(
    userId: number,
    projectId: number,
  ): Promise<ProjectSupporter | undefined> {
    const findSupporter = this.supporterRepository.find(
      item => item.userId === userId && item.projectId === projectId,
    );

    return findSupporter;
  }

  public async getProjectSupporters(
    projectId: number,
  ): Promise<ProjectSupporter[] | undefined> {
    const projects: ProjectSupporter[] = [];

    this.supporterRepository.forEach(item => {
      // eslint-disable-next-line no-unused-expressions
      if (
        item.projectId === projectId &&
        item.projectState !== 'CANCELED' &&
        item.confirmationToShowPhoto === true
      ) {
        projects.push(item);
      }
    });

    return projects;
  }

  public async cancel(project: Project, projectId: number): Promise<Project> {
    const findProject = this.ormRepository.find(item => item.id === projectId);

    if (findProject) {
      findProject.state = 'CANCELED';
      findProject.paymentState = 'CANCELED';
      // eslint-disable-next-line no-param-reassign
      project = findProject;
    }

    return project;
  }

  public async addSupporterToProject(
    data: IProjectSupporterDTO,
  ): Promise<ProjectSupporter> {
    const supporter = new ProjectSupporter();

    const randomId = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const id = randomId(10);
    Object.assign(supporter, { id }, data);

    this.supporterRepository.push(supporter);

    return supporter;
  }

  public async getAndUpdate(data: ProjectSupporter): Promise<ProjectSupporter> {
    this.supporterRepository.push(data);

    return data;
  }
}

export default FakeProjectsRepositories;
