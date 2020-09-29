import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import EntrepreneursDocuments from '@modules/users/infra/typeorm/entities/EntrepreneursDocuments';
import IEntrepreneursDocumentRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  field: string;
  document: string;
  userId: number;
  projectId: number;
}

@injectable()
class ResendEntrepreneurDocumentService {
  constructor(
    @inject('EntrepreneurDocumentsRepository')
    private entrepreneurDocuments: IEntrepreneursDocumentRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    field,
    document,
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

          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findUserData.identityFront = filename;
        }

        break;
      }
      case 'IDENTITY_BACK': {
        if (findUserData.identityBack) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.identityBack,
          );
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findUserData.identityBack = filename;
        }
        break;
      }
      case 'RESIDENTIAL_COMPROVANT': {
        if (findUserData.residentialComprovant) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.residentialComprovant,
          );
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findUserData.residentialComprovant = filename;
        }
        break;
      }
      case 'CNPJ_COMPROVANT': {
        if (findUserData.cnpjComprovant) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.cnpjComprovant,
          );

          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );

          findUserData.cnpjComprovant = filename;
        }
        break;
      }
      case 'COMERCIAL_RESIDENTIAL_COMPROVANT': {
        if (findUserData.comercialResidenceComprovant) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.comercialResidenceComprovant,
          );

          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );

          findUserData.comercialResidenceComprovant = filename;
        }
        break;
      }
      case 'PROPERTY_LEASE_AGREEMENT': {
        if (findUserData.propertyLeaseAgreement) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.propertyLeaseAgreement,
          );
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findUserData.propertyLeaseAgreement = filename;
        }
        break;
      }
      case 'PAYMENT_COMPROVANT1': {
        if (findUserData.paymentComprovant1) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.paymentComprovant1,
          );
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findUserData.paymentComprovant1 = filename;
        }
        break;
      }
      case 'PAYMENT_COMPROVANT2': {
        if (findUserData.paymentComprovant2) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.paymentComprovant2,
          );
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findUserData.paymentComprovant2 = filename;
        }
        break;
      }
      case 'PAYMENT_COMPROVANT3': {
        if (findUserData.paymentComprovant3) {
          await this.storageProvider.deleteEntrepreneurDocFile(
            findUserData.paymentComprovant3,
          );
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findUserData.paymentComprovant3 = filename;
        }
        break;
      }
      default:
        throw new AppError('Documento não identificado');
    }

    const updatedDocument = await this.entrepreneurDocuments.save(findUserData);

    return updatedDocument;
  }
}

export default ResendEntrepreneurDocumentService;
