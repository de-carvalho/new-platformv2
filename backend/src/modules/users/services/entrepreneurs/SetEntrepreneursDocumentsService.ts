import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import EntrepreneursDocuments from '@modules/users/infra/typeorm/entities/EntrepreneursDocuments';
import IEntrepreneursDocumentRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  document: string;
  field: string;
  userId: number;
  projectId: number;
}

@injectable()
class EntrepreneurDocumentService {
  constructor(
    @inject('EntrepreneurDocumentsRepository')
    private entrepreneurDocuments: IEntrepreneursDocumentRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    document,
    field,
    userId,
    projectId,
  }: IRequest): Promise<EntrepreneursDocuments> {
    const findUser = await this.entrepreneurDocuments.findUser(userId);
    const findProject = await this.entrepreneurDocuments.findProject(projectId);

    if (!findProject) {
      throw new AppError('Projeto não foi encontrado');
    }

    if (!findUser || findProject?.entrepreneurId !== userId) {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const findExistentData = await this.entrepreneurDocuments.findByIds(
      userId,
      projectId,
    );

    if (!findExistentData) {
      const filename = await this.storageProvider.saveEntrepreneurDocFile(
        document,
      );

      const documents = await this.entrepreneurDocuments.create({
        identityFront: filename,
        userId,
        status: 'Enviado',
        projectId,
      });

      return documents;
    }

    if (
      findExistentData.identityFront !== null &&
      findExistentData.identityBack !== null &&
      findExistentData.cnpjComprovant !== null &&
      findExistentData.residentialComprovant !== null &&
      findExistentData.comercialResidenceComprovant !== null &&
      findExistentData.paymentComprovant1 !== null &&
      findExistentData.paymentComprovant2 !== null &&
      findExistentData.paymentComprovant3 !== null &&
      findExistentData.propertyLeaseAgreement !== null
    ) {
      throw new AppError(
        'Você já enviou os documentos referentes a esse projeto',
      );
    }

    switch (field) {
      case 'IDENTITY_BACK':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.identityBack = filename;
        }
        break;

      case 'RESIDENTIAL_COMPROVANT':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.residentialComprovant = filename;
        }
        break;

      case 'COMERCIAL_RESIDENTIAL_COMPROVANT':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.comercialResidenceComprovant = filename;
        }
        break;

      case 'CNPJ_COMPROVANT':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.cnpjComprovant = filename;
        }
        break;

      case 'PAYMENT_COMPROVANT1':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.paymentComprovant1 = filename;
        }
        break;

      case 'PAYMENT_COMPROVANT2':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.paymentComprovant2 = filename;
        }
        break;

      case 'PAYMENT_COMPROVANT3':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.paymentComprovant3 = filename;
        }
        break;

      case 'PROPERTY_LEASE_AGREEMENT':
        {
          const filename = await this.storageProvider.saveEntrepreneurDocFile(
            document,
          );
          findExistentData.propertyLeaseAgreement = filename;
        }
        break;

      default:
        throw new AppError('Documento não identificado');
    }

    await this.entrepreneurDocuments.save(findExistentData);

    return findExistentData;
  }
}

export default EntrepreneurDocumentService;
