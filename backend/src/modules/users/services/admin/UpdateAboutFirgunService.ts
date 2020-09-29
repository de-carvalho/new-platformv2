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
class UpdateAboutFirgunService {
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

    if (findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const existingData = await this.adminAboutFirgun.getData();

    if (!existingData) {
      throw new AppError(
        'Nenhum registro foi encontrado, registre alguma informação antes de editar',
      );
    }

    if (about !== '') {
      existingData.about = about;
    }
    if (awards !== '') {
      existingData.awards = awards;
    }
    if (press !== '') {
      existingData.press = press;
    }

    await this.adminAboutFirgun.save(existingData);

    return existingData;
  }
}

export default UpdateAboutFirgunService;
