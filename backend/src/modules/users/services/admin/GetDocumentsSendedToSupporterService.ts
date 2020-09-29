import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminDocumentsToSupporter from '@modules/users/infra/typeorm/entities/AdminDocumentsToSupporter';
import IAdminDocumentsToSupporterRepository from '@modules/users/repositories/IAdminDocumentsToSupporterRepository';

interface IRequest {
  supporterId: number;
  userId: number;
}

@injectable()
class GetDocumentsSendedToSupporterService {
  constructor(
    @inject('AdminDocumentsToSupporterRepository')
    private adminDocumentsToSupporter: IAdminDocumentsToSupporterRepository,
  ) {}

  public async execute({
    supporterId,
    userId,
  }: IRequest): Promise<AdminDocumentsToSupporter> {
    const findLoggedUser = await this.adminDocumentsToSupporter.findUserById(
      userId,
    );

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const findSupporterDocuments = await this.adminDocumentsToSupporter.findUser(
      supporterId,
    );

    if (!findSupporterDocuments) {
      throw new AppError(
        'Nenhum documento referente a esse usuário foi encontrado',
      );
    }

    return findSupporterDocuments;
  }
}

export default GetDocumentsSendedToSupporterService;
