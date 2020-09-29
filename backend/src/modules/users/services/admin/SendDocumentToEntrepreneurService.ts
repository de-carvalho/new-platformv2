import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminDocumentsToEntrepreneur from '@modules/users/infra/typeorm/entities/AdminDocumentsToEntrepreneur';
import IAdminDocumentsToEntrepreneurRepository from '@modules/users/repositories/IAdminDocumentToEntrepreneurRepository';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  document: string;
  userId: number;
  projectId: number;
  entrepreneurId: number;
}

@injectable()
class SendDocumentsToEntrepreneurService {
  constructor(
    @inject('AdminDocumentsToEntrepreneurRepository')
    private adminDocumentsToEntrepreneur: IAdminDocumentsToEntrepreneurRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({
    document,
    userId,
    entrepreneurId,
    projectId,
  }: IRequest): Promise<AdminDocumentsToEntrepreneur> {
    const findLoggedUser = await this.adminDocumentsToEntrepreneur.findUserById(
      userId,
    );

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const checkEntrepreneur = await this.adminDocumentsToEntrepreneur.findUserById(
      entrepreneurId,
    );

    if (checkEntrepreneur?.role !== 'ENTREPRENEUR') {
      throw new AppError('O usuário encontrado não é empreendedor');
    }

    const findProject = await this.adminDocumentsToEntrepreneur.findProject(
      projectId,
    );

    if (!findProject || findProject.entrepreneurId !== entrepreneurId) {
      throw new AppError('Projecto não encontrado');
    }

    const findUserDocuments = await this.adminDocumentsToEntrepreneur.findUser(
      entrepreneurId,
      projectId,
    );

    if (!findUserDocuments) {
      const filename = await this.storageProvider.saveAdminDocFile(document);

      const documents = await this.adminDocumentsToEntrepreneur.create({
        contract: filename,
        userId: entrepreneurId,
        projectId,
      });

      return documents;
    }

    const filename = await this.storageProvider.saveAdminDocFile(document);

    findUserDocuments.contract = filename;

    await this.adminDocumentsToEntrepreneur.save(findUserDocuments);

    return findUserDocuments;
  }
}

export default SendDocumentsToEntrepreneurService;
