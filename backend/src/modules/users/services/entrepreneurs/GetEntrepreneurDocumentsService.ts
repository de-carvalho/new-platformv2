import { injectable, inject } from 'tsyringe';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppErrors';
import EntrepreneursDocuments from '@modules/users/infra/typeorm/entities/EntrepreneursDocuments';
import IEntrepreneursDocumentRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class GetEntrepreneurDocumentService {
  constructor(
    @inject('EntrepreneurDocumentsRepository')
    private entrepreneurDocuments: IEntrepreneursDocumentRepository,
  ) {}

  public async execute(userId: number): Promise<EntrepreneursDocuments> {
    const usersRepository = getRepository(User);
    const findUserDocuments = await this.entrepreneurDocuments.getUserData(
      userId,
    );

    const findUser = await usersRepository.findOne(userId);

    if (!findUser) {
      throw new AppError('Usuário não foi encontrado');
    }

    if (!findUserDocuments) {
      throw new AppError('Você ainda não enviou os documentos');
    }

    return findUserDocuments;
  }
}

export default GetEntrepreneurDocumentService;
