import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import AdminCheckProject from '@modules/users/infra/typeorm/entities/AdminCheckProjects';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';

interface IRequest {
  entrepreneurId: number;
  projectId: number;
  amountWanted: string;
  receiveDate: Date;
  totalInstallments: number;
  amountPerInstallment: string;
  percentageFee: string;
  partnerAmount: string;
  gracePeriod: Date;
  projectType: number;
  amountToPayback: string;
  firgunAmount: string;
  confirmedByEntrepreneur: boolean;
}

@injectable()
class EntrepreneurLoanMoneyService {
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
    amountPerInstallment,
    percentageFee,
    projectType,
    gracePeriod,
    amountToPayback,
    confirmedByEntrepreneur,
    partnerAmount,
    firgunAmount,
  }: IRequest): Promise<AdminCheckProject> {
    const findProject = await this.adminCheckProjects.findProject(projectId);

    if (!findProject) {
      throw new AppError('Projeto não existe.');
    }

    const findUser = await this.adminCheckProjects.findProjectByType(
      entrepreneurId,
      projectId,
      projectType,
    );

    if (!findUser) {
      throw new AppError('Nenhuma solicitação de contrato foi encontrada.');
    }

    // Atualiza os dados do projeto
    findProject.goal = amountWanted;
    findProject.totalToPayback = amountToPayback;
    findProject.projectType = projectType;
    findProject.installmentsPrediction = totalInstallments;
    findProject.percentageFee = percentageFee;
    findProject.gracePeriod = gracePeriod;
    findProject.totalPartnerAmount = partnerAmount;
    findProject.firgunAmountTotal = firgunAmount;

    await this.adminCheckProjects.saveProject(findProject);

    findUser.amountWanted = amountWanted;
    findUser.receiveDate = receiveDate;
    findUser.totalInstallments = totalInstallments;
    findUser.amountPerInstallment = amountPerInstallment;
    findUser.percentageFee = percentageFee;
    findUser.projectType = projectType;
    findUser.projectState = findProject.state;
    findUser.amountToPayback = amountToPayback;
    findUser.confirmedByEntrepreneur = confirmedByEntrepreneur;

    const updatedData = await this.adminCheckProjects.save(findUser);

    return updatedData;
  }
}

export default EntrepreneurLoanMoneyService;
