import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminAboutFirgun from '@modules/users/infra/typeorm/entities/AdminAboutFirgun';
import IAdminAboutFirgunRepository from '@modules/users/repositories/IAdminAboutFirgunRepository';

interface IRequest {
  about: string;
  awards: string;
  press: string;
  userId: number;
}

@injectable()
class AdminAboutFirgunService {
  constructor(
    @inject('AdminAboutFirgunRepository')
    private adminAboutFirgun: IAdminAboutFirgunRepository,
  ) {}

  public async execute({
    about,
    awards,
    press,
    userId,
  }: IRequest): Promise<AdminAboutFirgun> {
    const findLoggedUser = await this.adminAboutFirgun.findLoggedUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const aboutFirgun = await this.adminAboutFirgun.create({
      about,
      awards,
      press,
    });

    return aboutFirgun;
  }
}

export default AdminAboutFirgunService;
