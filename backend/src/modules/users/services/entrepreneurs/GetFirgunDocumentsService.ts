import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminDocumentsToEntrepreneur from '@modules/users/infra/typeorm/entities/AdminDocumentsToEntrepreneur';
import IAdminDocumentsToEntrepreneurRepository from '@modules/users/repositories/IAdminDocumentToEntrepreneurRepository';

@injectable()
class GetAdminDocumentsToEntrepreneurService {
  constructor(
    @inject('AdminDocumentsToEntrepreneurRepository')
    private adminDocumentsToEntrepreneur: IAdminDocumentsToEntrepreneurRepository,
  ) {}

  public async execute(
    userId: number,
    projectId: number,
  ): Promise<AdminDocumentsToEntrepreneur> {
    const findEntrepreneurDatas = await this.adminDocumentsToEntrepreneur.getUserData(
      userId,
      projectId,
    );

    if (!findEntrepreneurDatas) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    return findEntrepreneurDatas;
  }
}

export default GetAdminDocumentsToEntrepreneurService;
