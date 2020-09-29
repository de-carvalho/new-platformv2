import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminCheckProject from '@modules/users/infra/typeorm/entities/AdminCheckProjects';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';

@injectable()
class GetProjectAnalisedByAdminService {
  constructor(
    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,
  ) {}

  public async execute(
    userId: number,
    projectId: number,
  ): Promise<AdminCheckProject[] | undefined> {
    const findDatas = await this.adminCheckProjects.getProjectAnalised(
      userId,
      projectId,
    );

    if (findDatas?.length === 0) {
      throw new AppError('Nenhum projeto foi encontrado.');
    }

    return findDatas;
  }
}

export default GetProjectAnalisedByAdminService;
