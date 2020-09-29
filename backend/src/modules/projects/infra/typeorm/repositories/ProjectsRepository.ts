import { getRepository, Repository } from 'typeorm';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IProjectSupporterDTO from '@modules/projects/dtos/IProjectSupportersDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import ProjectSupporter from '../entities/ProjectSupporter';

import Project from '../entities/Project';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  private userRepository: Repository<User>;

  private supporterRepository: Repository<ProjectSupporter>;

  constructor() {
    this.ormRepository = getRepository(Project);
    this.userRepository = getRepository(User);
    this.supporterRepository = getRepository(ProjectSupporter);
  }

  // Encontra projetos em andamento
  public async findByStatus(
    state: string,
    paymentState: string,
    entrepreneurId: number,
  ): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({
      where: { state, paymentState, entrepreneurId },
    });

    return findProject;
  }

  public async findByPaymentState(
    entrepreneurId: number,
  ): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({
      where: [
        { entrepreneurId, paymentState: 'NOT_REFUNDED' },
        { entrepreneurId, paymentState: 'REFUNDING' },
      ],
    });

    return findProject;
  }

  public async findUser(userId: number): Promise<User | undefined> {
    const findUser = await this.userRepository.findOne(userId);

    return findUser;
  }

  public async getProjectsInProgress(): Promise<Project[] | undefined> {
    const projects = await this.ormRepository.find({
      where: { state: 'CATCHING', projectType: 1 },
    });

    return projects;
  }

  public async getPausedProjects(
    state: string,
  ): Promise<Project[] | undefined> {
    const projects = await this.ormRepository.find({
      where: { state },
    });

    return projects;
  }

  public async getFirgunProjects(
    projectType: number,
    state: string,
  ): Promise<Project[] | undefined> {
    const projects = await this.ormRepository.find({
      where: { state, projectType },
    });

    return projects;
  }

  public async getProjectsCompleted(
    state: string,
  ): Promise<Project[] | undefined> {
    const projects = await this.ormRepository.find({
      where: { state },
    });

    return projects;
  }

  public async getProjectsToLiberateWithdraw(): Promise<Project[] | undefined> {
    const projects = await this.ormRepository.find({
      where: { state: 'COMPLETED', paymentState: 'NOT_REFUNDED' },
    });

    return projects;
  }

  public async getUserProjectsInProgress(
    entrepreneurId: number,
  ): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: [
        { entrepreneurId, state: 'CATCHING' },
        { entrepreneurId, state: 'PAUSED' },
      ],
    });

    return project;
  }

  public async getUserProjectsCompleted(
    state: string,
    entrepreneurId: number,
  ): Promise<Project[] | undefined> {
    const project = await this.ormRepository.find({
      where: { state, entrepreneurId },
    });

    return project;
  }

  // Encontra o projeto pelo Id
  public async findById(id: number): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne(id);

    return findProject;
  }

  // Cria o projeto no banco de dados
  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(data);

    await this.ormRepository.save(project);

    return project;
  }

  // Encontra o usuário pelo Id
  public async findUserById(userId: string): Promise<User | undefined> {
    const findUser = this.userRepository.findOne(userId);

    return findUser;
  }

  // Encontra o usuário investidor do projeto
  public async findSupporterById(
    userId: number,
    projectId: number,
  ): Promise<ProjectSupporter | undefined> {
    const findUserInvestor = this.supporterRepository.findOne({
      userId,
      projectId,
    });

    return findUserInvestor;
  }

  // Busca todos os investidores de um projeto
  public async getProjectSupporters(
    projectId: number,
  ): Promise<ProjectSupporter[]> {
    const supporters = await this.supporterRepository.find({
      where: {
        projectId,
        projectState: !'CANCELED',
        confirmationToShowPhoto: true,
      },
      loadEagerRelations: true,
    });

    return supporters;
  }

  // Cancela o projeto
  public async cancel(project: Project, projectId: number): Promise<Project> {
    const supporterdProject = await this.supporterRepository.findOne(projectId);

    if (supporterdProject) {
      supporterdProject.projectState = 'CANCELED';

      await this.supporterRepository.save(supporterdProject);
    }

    return this.ormRepository.save(project);
  }

  // Adiciona o investidor ao projeto
  public async addSupporterToProject(
    data: IProjectSupporterDTO,
  ): Promise<ProjectSupporter> {
    const supporter = this.supporterRepository.create(data);

    await this.supporterRepository.save(supporter);

    return supporter;
  }

  public async save(data: Project): Promise<Project> {
    return this.ormRepository.save(data);
  }

  // Atualiza os dados de investimento do investidor já adicionado no projeto
  public async getAndUpdate(data: ProjectSupporter): Promise<ProjectSupporter> {
    return this.supporterRepository.save(data);
  }
}

export default ProjectsRepository;
