/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';
import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';
import IEntrepreneurPortfolioRepository from '@modules/users/repositories/IEntrepreneurPortfolioRepository';
import ISupporterLoanSituationRepository from '../../repositories/ISupporterLoanSituationRepository';

interface IRequest {
  projectId: number;
  userId: number;
}

@injectable()
class SatisfiedWithAmounCapturedService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('InterestRepository')
    private interest: InterestRepository,

    @inject('EntrepreneurBankStatementRepository')
    private entrepreneursRepository: IEntrepreneurBankStatementRepository,

    @inject('SupporterLoanSituationRepository')
    private supportersRepository: ISupporterLoanSituationRepository,

    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,

    @inject('EntrepreneurPortfolioRepository')
    private entrepreneursPortfolio: IEntrepreneurPortfolioRepository,
  ) {}

  public async execute({ projectId, userId }: IRequest): Promise<Project> {
    const findProject = await this.projectsRepository.findById(projectId);

    if (!findProject) {
      throw new AppError('Projeto não encontrado');
    }

    const findUser = await this.projectsRepository.findUser(userId);

    if (findProject.entrepreneurId !== userId && findUser?.role !== 'ADMIN') {
      throw new AppError('Você não está habilitado para pausar o projeto.');
    }

    if (findProject.state === 'COMPLETED') {
      throw new AppError('O projeto já está completo');
    }

    // Recalcula os valores que o empreendedor irá pagar por parcela
    const installment = await this.interest.installmentAmount(
      findProject.raised,
      findProject.installmentsPrediction,
    );
    // Recalcula o valor total que o empreendedor irá pagar
    const amountToPayBack = await this.interest.totalToPayBack(
      installment.toString(),
      findProject.installmentsPrediction,
    );
    // Recalcula o valor total que a Firgun e o empreender irão receber
    const interestFirgun = await this.interest.firgunAmount(findProject.raised);
    // Recalcula o valor total que o Parceiro irá receber
    const partnerAmount = await this.interest.partnerAmount(findProject.raised);

    // Valor restante do empreendedor
    const entrepreneurAmount =
      Number(findProject.raised) - interestFirgun - partnerAmount;

    // Atualiza os dados do projeto
    findProject.state = 'COMPLETED';
    findProject.goal = findProject.raised;
    findProject.withdrawn = entrepreneurAmount.toFixed(2);
    findProject.totalToPayback = amountToPayBack.toFixed(2);
    findProject.firgunAmountTotal = interestFirgun.toFixed(2);
    findProject.totalPartnerAmount = partnerAmount.toFixed(2);

    const project = await this.projectsRepository.save(findProject);

    // Altera o estrato de pagamento e a carteira do empreendedor; "Parceiro"
    for (
      let index = 1;
      index <= findProject.installmentsPrediction;
      index += 1
    ) {
      const entrepreneurStatement = await this.entrepreneursRepository.findByInstallment(
        findProject.entrepreneurId,
        index,
        projectId,
      );

      if (entrepreneurStatement) {
        entrepreneurStatement.amount = installment.toFixed(2);
        await this.entrepreneursRepository.save(entrepreneurStatement);
      }

      const entrepreneurPortfolio = await this.entrepreneursPortfolio.findEntrepreneur(
        findProject.entrepreneurId,
        projectId,
        index,
      );

      if (entrepreneurPortfolio) {
        entrepreneurPortfolio.requestedAmount = findProject.raised;
        entrepreneurPortfolio.amountCaptured = findProject.raised;

        await this.entrepreneursPortfolio.save(entrepreneurPortfolio);
      }
    }

    // Atualiza os dados do projeto na seção do Admin
    const findProjectOnAdmin = await this.adminCheckProjects.findProjectByType(
      findProject.entrepreneurId,
      projectId,
      findProject.projectType,
    );

    if (findProjectOnAdmin) {
      findProjectOnAdmin.amountWanted = findProject.raised;
      findProjectOnAdmin.loanMargin = findProject.raised;
      findProjectOnAdmin.percentageFee = findProject.percentageFee;
      findProjectOnAdmin.amountPerInstallment = installment.toFixed(2);
      findProjectOnAdmin.amountToPayback = amountToPayBack.toFixed(2);
      findProjectOnAdmin.projectState = 'COMPLETED';

      await this.adminCheckProjects.save(findProjectOnAdmin);
    }

    // Atualiza os valores que o investidor irá receber
    const investors = await this.projectsRepository.getProjectSupporters(
      projectId,
    );

    if (investors.length !== 0) {
      investors.map(async investor => {
        const supporterAmount = await this.interest.supporterAmount(
          investor.amount,
          findProject.raised,
          investor.amount,
          findProject.installmentsPrediction,
        );

        investor.amountPerInstallment = supporterAmount.installmentAmount.toFixed(
          2,
        );
        investor.totalAmountReceivable = supporterAmount.amountTotal.toFixed(2);
        investor.amountToReceive = supporterAmount.amountTotal.toFixed(2);
        investor.amountInterest = supporterAmount.monthyInterest.toFixed(2);

        await this.projectsRepository.getAndUpdate(investor);

        let balanceDue = Number(investor.amount);

        for (
          let index = 1;
          index <= findProject.installmentsPrediction;
          index += 1
        ) {
          // Recalcula os valores dos investidores
          const investorAmount = await this.interest.supporterAmount(
            investor.amount,
            findProject.raised,
            String(balanceDue),
            findProject.installmentsPrediction,
          );

          const findInvestorLoanSituation = await this.supportersRepository.findInstallment(
            investor.userId,
            projectId,
            index, // representa o número da parcela
          );

          balanceDue -= Number(investorAmount.amountCorrected.toFixed(2));

          if (findInvestorLoanSituation) {
            findInvestorLoanSituation.amountInvested = investor.amount;
            findInvestorLoanSituation.amountReceived =
              investor.amountPerInstallment;
            findInvestorLoanSituation.amountInterest = investorAmount.monthyInterest.toFixed(
              2,
            );
            findInvestorLoanSituation.amountCorrected = investorAmount.amountCorrected.toFixed(
              2,
            );

            await this.supportersRepository.save(findInvestorLoanSituation);
          }
        }
      });
    }

    return project;
  }
}

export default SatisfiedWithAmounCapturedService;
