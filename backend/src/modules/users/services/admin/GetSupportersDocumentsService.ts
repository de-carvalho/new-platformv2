import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterDocuments from '@modules/users/infra/typeorm/entities/SupporterDocuments';
import ISupporterDocumentRepository from '@modules/users/repositories/ISupporterDocumentsRepository';

interface IRequest {
  supporterId: number;
  userId: number;
}

@injectable()
class GetSupporterDocumentService {
  constructor(
    @inject('SupporterDocumentsRepository')
    private supporterDocuments: ISupporterDocumentRepository,
  ) {}

  public async execute({
    supporterId,
    userId,
  }: IRequest): Promise<SupporterDocuments> {
    const findLoggedUser = await this.supporterDocuments.findUser(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const supporterDocuments = await this.supporterDocuments.findById(
      supporterId,
    );

    if (!supporterDocuments) {
      throw new AppError(
        'Nenhum documento referente a esse usuário foi encontrado',
      );
    }

    return supporterDocuments;
  }
}

export default GetSupporterDocumentService;
