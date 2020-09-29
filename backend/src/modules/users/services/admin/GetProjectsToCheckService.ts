import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminCheckProject from '@modules/users/infra/typeorm/entities/AdminCheckProjects';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';

@injectable()
class GetProjectsToCheckService {
  constructor(
    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,
  ) {}

  public async execute(): Promise<AdminCheckProject[] | undefined> {
    const findDatas = await this.adminCheckProjects.getDatas();

    const projects = findDatas?.filter(
      project =>
        project.projectType === 1 &&
        project.confirmedByEntrepreneur === false &&
        project.firgunAnalysis === false,
    );

    if (findDatas?.length === 0) {
      throw new AppError('Nenhum projeto foi encontrado.');
    }

    return projects;
  }
}

export default GetProjectsToCheckService;
