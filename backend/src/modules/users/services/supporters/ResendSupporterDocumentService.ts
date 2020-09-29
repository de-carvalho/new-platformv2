import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterDocuments from '@modules/users/infra/typeorm/entities/SupporterDocuments';
import ISupporterDocumentRepository from '@modules/users/repositories/ISupporterDocumentsRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  field: string;
  document: string;
  userId: number;
}

@injectable()
class ResendSupporterDocumentService {
  constructor(
    @inject('SupporterDocumentsRepository')
    private supporterDocuments: ISupporterDocumentRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    field,
    document,
    userId,
  }: IRequest): Promise<SupporterDocuments> {
    const findUser = await this.supporterDocuments.findById(userId);

    if (!findUser) {
      throw new AppError('Usuário não foi encontrado!');
    }

    if (field === 'IDENTITY_FRONT') {
      if (findUser.identityFront) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.identityFront,
        );
        const filename = await this.storageProvider.saveSupporterDocFile(
          document,
        );
        findUser.identityFront = filename;
      }
    } else if (field === 'IDENTITY_BACK') {
      if (findUser.identityBack) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.identityBack,
        );
        const filename = await this.storageProvider.saveSupporterDocFile(
          document,
        );
        findUser.identityBack = filename;
      }
    } else if (field === 'RESIDENTIAL_COMPROVANT') {
      if (findUser.residentialComprovant) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.residentialComprovant,
        );
        const filename = await this.storageProvider.saveSupporterDocFile(
          document,
        );
        findUser.residentialComprovant = filename;
      }
    } else if (field === 'PAYMENT_COMPROVANT') {
      if (findUser.paymentComprovant) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.paymentComprovant,
        );
        const filename = await this.storageProvider.saveSupporterDocFile(
          document,
        );
        findUser.paymentComprovant = filename;
      }
    }

    const updatedDocument = await this.supporterDocuments.save(findUser);

    return updatedDocument;
  }
}

export default ResendSupporterDocumentService;
