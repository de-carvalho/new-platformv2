import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';

interface IRequest {
  entrepreneurId: number;
  projectId: number;
  amountWanted: string;
  receiveDate?: Date;
  totalInstallments: number;
  entrepreneurDocsId: number;
}

@injectable()
class EntrepreneurRequestContractService {
  constructor(
    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,
  ) {}

  public async execute({
    entrepreneurId,
    projectId,
    amountWanted,
    receiveDate,
    totalInstallments,
    entrepreneurDocsId,
  }: IRequest): Promise<void> {
    const findUser = await this.adminCheckProjects.findUserById(entrepreneurId);

    if (!findUser) {
      throw new AppError('Usuário não foi encontrado.');
    }

    const checkUserAndProject = await this.adminCheckProjects.findUser(
      entrepreneurId,
      projectId,
    );

    if (checkUserAndProject) {
      throw new AppError('Você já solicitou o contrato para esse projeto.');
    }

    if (findUser.bankNumber === null) {
      throw new AppError(
        'Número do banco não foi informado, confirme seus dados bancários',
      );
    }
    if (findUser.bankAccountNumber === null) {
      throw new AppError(
        'Número da conta bancária não foi informado, confirme seus dados bancários',
      );
    }
    if (findUser.bankAgencyNumber === null) {
      throw new AppError(
        'Número da agência não foi informado, confirme seus dados bancários',
      );
    }
    if (findUser.bankAccountType === null) {
      throw new AppError(
        'Tipo de conta bancária não foi informado, confirme seus dados bancários',
      );
    }

    // Tipo de projeto 1 é igual a Coletivo
    await this.adminCheckProjects.create({
      entrepreneurId,
      projectId,
      amountWanted,
      receiveDate,
      totalInstallments,
      entrepreneurDocsId,
      projectType: 1,
    });

    // Tipo de projeto 1 é igual a Debenture
    await this.adminCheckProjects.create({
      entrepreneurId,
      projectId,
      amountWanted,
      receiveDate,
      totalInstallments,
      entrepreneurDocsId,
      projectType: 2,
    });
  }
}

export default EntrepreneurRequestContractService;
