import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IUsersRepository from '../../repositories/IUserPJRepository';

@injectable()
class GetProjectsSupportedInProgress {
  constructor(
    @inject('UserPJRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: number): Promise<Project[] | undefined> {
    const findProjects = await this.usersRepository.getProjectsSupportedInProgress(
      userId,
    );

    if (findProjects?.length === 0) {
      throw new AppError('Nenhum projeto foi encontrado.');
    }

    return findProjects;
  }
}

export default GetProjectsSupportedInProgress;
