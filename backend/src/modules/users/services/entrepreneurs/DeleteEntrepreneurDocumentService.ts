import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import EntrepreneursDocuments from '@modules/users/infra/typeorm/entities/EntrepreneursDocuments';
import IEntrepreneursDocumentRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  field: string;
  userId: number;
  projectId: number;
}

@injectable()
class DeleteEntrepreneurDocumentService {
  constructor(
    @inject('EntrepreneurDocumentsRepository')
    private entrepreneurDocuments: IEntrepreneursDocumentRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    field,
    userId,
    projectId,
  }: IRequest): Promise<EntrepreneursDocuments> {
    const findUser = await this.entrepreneurDocuments.findUser(userId);
    const findUserData = await this.entrepreneurDocuments.findByIds(
      userId,
      projectId,
    );

    if (!findUser) {
      throw new AppError('Usuário não foi encontrado');
    }

    if (!findUserData) {
      throw new AppError('Nenhum dado referente a esse projeto foi encontrado');
    }

    switch (field) {
      case 'IDENTITY_FRONT': {
        if (findUserData.identityFront) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.identityFront,
          );

          findUserData.identityFront = '';
        }

        break;
      }
      case 'IDENTITY_BACK': {
        if (findUserData.identityBack) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.identityBack,
          );

          findUserData.identityBack = '';
        }
        break;
      }
      case 'RESIDENTIAL_COMPROVANT': {
        if (findUserData.residentialComprovant) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.residentialComprovant,
          );

          findUserData.residentialComprovant = '';
        }
        break;
      }
      case 'CNPJ_COMPROVANT': {
        if (findUserData.cnpjComprovant) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.cnpjComprovant,
          );

          findUserData.cnpjComprovant = '';
        }
        break;
      }
      case 'COMERCIAL_RESIDENTIAL_COMPROVANT': {
        if (findUserData.comercialResidenceComprovant) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.comercialResidenceComprovant,
          );

          findUserData.comercialResidenceComprovant = '';
        }
        break;
      }
      case 'PROPERTY_LEASE_AGREEMENT': {
        if (findUserData.propertyLeaseAgreement) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.propertyLeaseAgreement,
          );

          findUserData.propertyLeaseAgreement = '';
        }
        break;
      }
      case 'PAYMENT_COMPROVANT1': {
        if (findUserData.paymentComprovant1) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.paymentComprovant1,
          );

          findUserData.paymentComprovant1 = '';
        }
        break;
      }
      case 'PAYMENT_COMPROVANT2': {
        if (findUserData.paymentComprovant2) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.paymentComprovant2,
          );

          findUserData.paymentComprovant2 = '';
        }
        break;
      }
      case 'PAYMENT_COMPROVANT3': {
        if (findUserData.paymentComprovant3) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.paymentComprovant3,
          );

          findUserData.paymentComprovant3 = '';
        }
        break;
      }
      default:
        throw new AppError('Documento não identificado');
    }

    const deletedDocument = await this.entrepreneurDocuments.save(findUserData);

    return deletedDocument;
  }
}

export default DeleteEntrepreneurDocumentService;
