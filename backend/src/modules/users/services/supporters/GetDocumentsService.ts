import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterDocuments from '@modules/users/infra/typeorm/entities/SupporterDocuments';
import ISupporterDocumentRepository from '@modules/users/repositories/ISupporterDocumentsRepository';

interface IRequest {
  supporterId: number;
}

@injectable()
class GetDocumentService {
  constructor(
    @inject('SupporterDocumentsRepository')
    private supporterDocuments: ISupporterDocumentRepository,
  ) {}

  public async execute({ supporterId }: IRequest): Promise<SupporterDocuments> {
    const findLoggedUser = await this.supporterDocuments.findUser(supporterId);

    if (!findLoggedUser) {
      throw new AppError('Usuário não foi encontrado');
    }

    const supporterDocuments = await this.supporterDocuments.findById(
      supporterId,
    );

    if (!supporterDocuments) {
      throw new AppError('Nenhum documento foi encontrado');
    }

    return supporterDocuments;
  }
}

export default GetDocumentService;
