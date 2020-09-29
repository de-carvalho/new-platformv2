import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import EntrepreneursDocuments from '@modules/users/infra/typeorm/entities/EntrepreneursDocuments';
import IEntrepreneursDocumentRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  entrepreneurId: number;
  userId: number;
  projectId: number;
}

@injectable()
class GetEntrepreneurDocumentService {
  constructor(
    @inject('EntrepreneurDocumentsRepository')
    private entrepreneurDocuments: IEntrepreneursDocumentRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    entrepreneurId,
    userId,
    projectId,
  }: IRequest): Promise<EntrepreneursDocuments> {
    const findLoggedUser = await this.entrepreneurDocuments.findUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const entrepreneurDocuments = await this.entrepreneurDocuments.findByIds(
      entrepreneurId,
      projectId,
    );

    if (!entrepreneurDocuments) {
      throw new AppError(
        'Nenhum documento referente a esse usuário e projeto foi encontrado',
      );
    }

    return entrepreneurDocuments;
  }
}

export default GetEntrepreneurDocumentService;
