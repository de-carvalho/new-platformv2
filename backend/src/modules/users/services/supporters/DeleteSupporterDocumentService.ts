import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterDocuments from '@modules/users/infra/typeorm/entities/SupporterDocuments';
import ISupporterDocumentRepository from '@modules/users/repositories/ISupporterDocumentsRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  field: string;
  userId: number;
}

@injectable()
class DeleteSupporterDocumentService {
  constructor(
    @inject('SupporterDocumentsRepository')
    private supporterDocuments: ISupporterDocumentRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    field,
    userId,
  }: IRequest): Promise<SupporterDocuments> {
    const findUser = await this.supporterDocuments.findById(userId);

    // ===Verificação do usuário===
    if (!findUser) {
      throw new AppError('Usuário não foi encontrado!');
    }

    if (field === 'IDENTITY_FRONT') {
      if (findUser.identityFront) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.identityFront,
        );

        findUser.identityFront = '';
      }
    } else if (field === 'IDENTITY_BACK') {
      if (findUser.identityBack) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.identityBack,
        );

        findUser.identityBack = '';
      }
    } else if (field === 'RESIDENTIAL_COMPROVANT') {
      if (findUser.residentialComprovant) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.residentialComprovant,
        );

        findUser.residentialComprovant = '';
      }
    } else if (field === 'PAYMENT_COMPROVANT') {
      if (findUser.paymentComprovant) {
        await this.storageProvider.deleteSupporterDocFile(
          findUser.paymentComprovant,
        );

        findUser.paymentComprovant = '';
      }
    }

    const deletedDocument = await this.supporterDocuments.save(findUser);

    return deletedDocument;
  }
}

export default DeleteSupporterDocumentService;
