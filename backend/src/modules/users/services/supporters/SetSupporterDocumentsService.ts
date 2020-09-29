import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterDocuments from '@modules/users/infra/typeorm/entities/SupporterDocuments';
import ISupporterDocumentRepository from '@modules/users/repositories/ISupporterDocumentsRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  document: string;
  field: string;
  userId: number;
}

@injectable()
class SupporterDocumentService {
  constructor(
    @inject('SupporterDocumentsRepository')
    private supporterDocuments: ISupporterDocumentRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    document,
    field,
    userId,
  }: IRequest): Promise<SupporterDocuments> {
    const findUserDocuments = await this.supporterDocuments.findById(userId);
    const findUser = await this.supporterDocuments.findUser(userId);

    if (!findUser) {
      throw new AppError('Usuário não foi encontrado');
    }

    if (!findUserDocuments) {
      const filename = await this.storageProvider.saveSupporterDocFile(
        document,
      );

      const documents = await this.supporterDocuments.create({
        identityFront: filename,
        userId,
      });

      return documents;
    }

    switch (field) {
      case 'IDENTITY_BACK':
        {
          const filename = await this.storageProvider.saveSupporterDocFile(
            document,
          );
          findUserDocuments.identityBack = filename;
        }
        break;

      case 'RESIDENTIAL_COMPROVANT':
        {
          const filename = await this.storageProvider.saveSupporterDocFile(
            document,
          );
          findUserDocuments.residentialComprovant = filename;
        }
        break;

      case 'PAYMENT_COMPROVANT':
        {
          const filename = await this.storageProvider.saveSupporterDocFile(
            document,
          );
          findUserDocuments.paymentComprovant = filename;
        }
        break;

      default:
        break;
    }

    await this.supporterDocuments.save(findUserDocuments);

    return findUserDocuments;
  }
}

export default SupporterDocumentService;
