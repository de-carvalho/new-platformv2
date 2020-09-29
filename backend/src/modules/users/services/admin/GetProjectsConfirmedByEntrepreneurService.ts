import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminCheckProject from '@modules/users/infra/typeorm/entities/AdminCheckProjects';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';

@injectable()
class GetProjectsToConfirmedService {
  constructor(
    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,
  ) {}

  public async execute(): Promise<AdminCheckProject[] | undefined> {
    const findDatas = await this.adminCheckProjects.getDatas();

    const projects = findDatas?.filter(
      project =>
        project.confirmedByEntrepreneur === true &&
        project.firgunAnalysis === true &&
        project.projectState === 'CATCHING',
    );

    if (findDatas?.length === 0) {
      throw new AppError('Nenhum projeto foi encontrado.');
    }

    return projects;
  }
}

export default GetProjectsToConfirmedService;
