import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminDocumentsToEntrepreneur from '@modules/users/infra/typeorm/entities/AdminDocumentsToEntrepreneur';
import IAdminDocumentsToEntrepreneurRepository from '@modules/users/repositories/IAdminDocumentToEntrepreneurRepository';

interface IRequest {
  entrepreneurId: number;
  userId: number;
  projectId: number;
}

@injectable()
class GetDocumentsSendedToEntrepreneurService {
  constructor(
    @inject('AdminDocumentsToEntrepreneurRepository')
    private adminDocumentsToEntrepreneur: IAdminDocumentsToEntrepreneurRepository,
  ) {}

  public async execute({
    entrepreneurId,
    userId,
    projectId,
  }: IRequest): Promise<AdminDocumentsToEntrepreneur> {
    const findLoggedUser = await this.adminDocumentsToEntrepreneur.findUserById(
      userId,
    );

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const findEntrepreneurDocuments = await this.adminDocumentsToEntrepreneur.findUser(
      entrepreneurId,
      projectId,
    );

    if (!findEntrepreneurDocuments) {
      throw new AppError(
        'Nenhum documento referente a esse projeto foi encontrado',
      );
    }

    return findEntrepreneurDocuments;
  }
}

export default GetDocumentsSendedToEntrepreneurService;
