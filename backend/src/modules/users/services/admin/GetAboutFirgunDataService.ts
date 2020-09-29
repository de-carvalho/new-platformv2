import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminAboutFirgun from '@modules/users/infra/typeorm/entities/AdminAboutFirgun';
import IAdminAboutFirgunRepository from '@modules/users/repositories/IAdminAboutFirgunRepository';

@injectable()
class AdminAboutFirgunService {
  constructor(
    @inject('AdminAboutFirgunRepository')
    private adminAboutFirgun: IAdminAboutFirgunRepository,
  ) {}

  public async execute(): Promise<AdminAboutFirgun> {
    const data = await this.adminAboutFirgun.getData();

    if (!data) {
      throw new AppError('Nenhuma informação foi encontrada.');
    }

    return data;
  }
}

export default AdminAboutFirgunService;
