import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminCheckProject from '@modules/users/infra/typeorm/entities/AdminCheckProjects';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';
import IEntrepreneursDocumentRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';

@injectable()
class AdminCheckProjectService {
  constructor(
    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,

    @inject('EntrepreneurDocumentsRepository')
    private entrepreneurDocuments: IEntrepreneursDocumentRepository,
  ) {}

  public async execute(
    entrepreneurId: number,
    userId: number,
    projectId: number,
    loanMargin: string,
    receiveDate: Date,
    gracePeriod: Date,
    totalInstallments: number,
    analysisResult: boolean,
    amountPerInstallment: string,
    amountToPayback: string,
    percentageFee: string,
    amountPerInstallment2: string,
    amountToPayback2: string,
    percentageFee2: string,
    receiveDate2: Date,
  ): Promise<AdminCheckProject> {
    const findLoggedUser = await this.adminCheckProjects.findUserById(userId);

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const findProject = await this.adminCheckProjects.findProject(projectId);

    if (!findProject) {
      throw new AppError('Projeto não encontrado.');
    }

    const findProjectType1 = await this.adminCheckProjects.findProjectByType(
      entrepreneurId,
      projectId,
      1,
    );
    const findProjectType2 = await this.adminCheckProjects.findProjectByType(
      entrepreneurId,
      projectId,
      2,
    );

    if (!findProjectType1) {
      throw new AppError(
        'Nenhum registro referente a esse usuário e projeto foi encontrado.',
      );
    }
    if (!findProjectType2) {
      throw new AppError(
        'Nenhum registro referente a esse usuário e projeto foi encontrado.',
      );
    }

    const findEntrepreneurDocs = await this.entrepreneurDocuments.findByIds(
      userId,
      projectId,
    );

    if (!findEntrepreneurDocs) {
      throw new AppError(
        'Nenhum documento referente a esse usuário e projeto foi encontrado.',
      );
    }

    if (analysisResult === false) {
      findProject.firgunAnalisys = analysisResult;
      findProjectType1.firgunAnalysis = analysisResult;
      findProjectType2.firgunAnalysis = analysisResult;
      findEntrepreneurDocs.status = 'Confirmado';

      await this.adminCheckProjects.saveProject(findProject);
      const updatedData = await this.adminCheckProjects.save(findProjectType1);
      await this.adminCheckProjects.save(findProjectType2);
      await this.entrepreneurDocuments.save(findEntrepreneurDocs);

      return updatedData;
    }

    // Projeto tipo 1
    findProjectType1.loanMargin = loanMargin;
    findProjectType1.receiveDate = receiveDate;
    findProjectType1.gracePeriod = gracePeriod;
    findProjectType1.totalInstallments = totalInstallments;
    findProjectType1.firgunAnalysis = analysisResult;
    findProjectType1.amountPerInstallment = amountPerInstallment;
    findProjectType1.amountToPayback = amountToPayback;
    findProjectType1.percentageFee = percentageFee;

    // Projeto tipo 2
    findProjectType2.loanMargin = loanMargin;
    findProjectType2.receiveDate = receiveDate2;
    findProjectType2.gracePeriod = gracePeriod;
    findProjectType2.totalInstallments = totalInstallments;
    findProjectType2.firgunAnalysis = analysisResult;
    findProjectType2.amountPerInstallment = amountPerInstallment2;
    findProjectType2.amountToPayback = amountToPayback2;
    findProjectType2.percentageFee = percentageFee2;

    // Projeto geral
    findProject.firgunAnalisys = true;
    findEntrepreneurDocs.status = 'Confirmado';

    await this.adminCheckProjects.saveProject(findProject);
    await this.entrepreneurDocuments.save(findEntrepreneurDocs);

    const updatedData = await this.adminCheckProjects.save(findProjectType1);
    await this.adminCheckProjects.save(findProjectType2);
    return updatedData;
  }
}

export default AdminCheckProjectService;
