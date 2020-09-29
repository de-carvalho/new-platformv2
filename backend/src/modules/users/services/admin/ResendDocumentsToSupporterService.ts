import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminDocumentsToSupporter from '@modules/users/infra/typeorm/entities/AdminDocumentsToSupporter';
import IAdminDocumentsToSupporterRepository from '@modules/users/repositories/IAdminDocumentsToSupporterRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  document: string;
  field: string;
  userId: number;
  supporterId: number;
}

@injectable()
class SendDocumentsToSupporterService {
  constructor(
    @inject('AdminDocumentsToSupporterRepository')
    private adminDocumentsToSupporter: IAdminDocumentsToSupporterRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    document,
    field,
    userId,
    supporterId,
  }: IRequest): Promise<AdminDocumentsToSupporter> {
    const findLoggedUser = await this.adminDocumentsToSupporter.findUserById(
      userId,
    );

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const findUserDocuments = await this.adminDocumentsToSupporter.findUser(
      supporterId,
    );

    if (!findUserDocuments) {
      throw new AppError(
        'Nenhum documento referente a esse usuário foi encontrado.',
      );
    }

    switch (field) {
      case 'IMPACT_NEWSLETTER':
        {
          const filename = await this.storageProvider.saveAdminDocFile(
            document,
          );
          findUserDocuments.impactNewsletter = filename;
        }
        break;

      case 'IRPF1':
        {
          const filename = await this.storageProvider.saveAdminDocFile(
            document,
          );
          findUserDocuments.statementIRPF1 = filename;
        }
        break;

      case 'IRPF2':
        {
          const filename = await this.storageProvider.saveAdminDocFile(
            document,
          );
          findUserDocuments.statementIRPF2 = filename;
        }
        break;

      case 'INVESTMENT_RECEIPT':
        {
          const filename = await this.storageProvider.saveAdminDocFile(
            document,
          );
          findUserDocuments.investmentReceipt = filename;
        }
        break;

      default:
        break;
    }

    await this.adminDocumentsToSupporter.save(findUserDocuments);

    return findUserDocuments;
  }
}

export default SendDocumentsToSupporterService;
