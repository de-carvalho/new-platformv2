import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminDocumentsToSupporter from '@modules/users/infra/typeorm/entities/AdminDocumentsToSupporter';
import IAdminDocumentsToSupporterRepository from '../../repositories/IAdminDocumentsToSupporterRepository';

@injectable()
class AdminDocumentsToSupporterService {
  constructor(
    @inject('AdminDocumentsToSupporterRepository')
    private adminDocumentsToSupporter: IAdminDocumentsToSupporterRepository,
  ) {}

  public async execute(userId: number): Promise<AdminDocumentsToSupporter> {
    const findSupporterDatas = await this.adminDocumentsToSupporter.getUserData(
      userId,
    );

    if (!findSupporterDatas) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    return findSupporterDatas;
  }
}

export default AdminDocumentsToSupporterService;
