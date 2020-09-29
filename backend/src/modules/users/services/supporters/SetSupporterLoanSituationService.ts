/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';
import ISupporterLoanSituationRepository from '../../repositories/ISupporterLoanSituationRepository';

interface IRequest {
  projectName: string;
  amountReceived?: string;
  projectId: number;
  amountInvested: string;
  totalInstallments: number;
  status: string;
  userId: number;
  refundStatus: string;
  projectAmount: string;
}
@injectable()
class SupporterLoanSituationService {
  constructor(
    @inject('SupporterLoanSituationRepository')
    private supportersRepository: ISupporterLoanSituationRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('InterestRepository')
    private interest: InterestRepository,
  ) {}

  public async execute({
    projectName,
    amountReceived,
    projectId,
    amountInvested,
    totalInstallments,
    status,
    userId,
    refundStatus,
    projectAmount,
  }: IRequest): Promise<void> {
    const findUser = await this.supportersRepository.findUser(
      userId,
      projectId,
    );

    // Verifica se o usuário já investiu no projeto e se sim, apenas altera os
    // seguintes dados: valor investido, valor a receber, valor do juros e valor corrigido
    if (findUser) {
      let balanceDue = Number(amountInvested);

      for (let index = 1; index <= totalInstallments; index += 1) {
        const findUserByInstallment = await this.supportersRepository.findInstallment(
          userId,
          projectId,
          index,
        );

        if (findUserByInstallment) {
          const newAmountInvested =
            Number(findUserByInstallment.amountInvested) +
            Number(amountInvested);
          findUserByInstallment.amountInvested = `${newAmountInvested.toFixed(
            2,
          )}`;

          const newAmountToReceive =
            Number(findUserByInstallment.amountReceived) +
            Number(amountReceived);
          findUserByInstallment.amountReceived = `${newAmountToReceive.toFixed(
            2,
          )}`;

          // Chama a função que calcula o juros e valor a receber do investidor
          const interestSupporter = await this.interest.supporterAmount(
            String(amountReceived),
            projectAmount,
            String(balanceDue),
            totalInstallments,
          );

          balanceDue -= Number(interestSupporter.amountCorrected.toFixed(2));

          findUserByInstallment.amountInterest = `${
            Number(findUserByInstallment.amountInterest) +
            interestSupporter.monthyInterest.toFixed(2)
          }`;

          findUserByInstallment.amountCorrected = `${
            Number(findUserByInstallment.amountCorrected) +
            interestSupporter.amountCorrected.toFixed(2)
          }`;

          await this.supportersRepository.save(findUserByInstallment);
        }
      }

      return;
    }

    // Executa caso o usuário ainda não tenha investido no projeto
    let balanceDue = Number(amountInvested);

    for (
      let installment = 1;
      totalInstallments >= installment;
      installment += 1
    ) {
      // Chama a função que calcula o juros e valor a receber do investidor
      const interestSupporter = await this.interest.supporterAmount(
        amountInvested,
        projectAmount,
        String(balanceDue),
        totalInstallments,
      );

      balanceDue -= Number(interestSupporter.amountCorrected.toFixed(2));

      await this.supportersRepository.create({
        projectName,
        amountCorrected: interestSupporter.amountCorrected.toFixed(2),
        amountInterest: interestSupporter.monthyInterest.toFixed(2),
        amountInvested,
        amountReceived,
        installmentPayed: installment,
        projectId,
        refundStatus,
        status,
        totalInstallments,
        userId,
      });
    }
  }

  // Essa função é executa no reembolso dos valores emprestados
  public async executeOnRefund(
    userId: number,
    projectId: number,
    installments: number,
  ): Promise<void> {
    const findUser = await this.supportersRepository.findInstallment(
      userId,
      projectId,
      installments,
    );

    if (!findUser) {
      throw new AppError('Nenhum investidor foi encontrado!');
    }

    // Altera o estado de pagamento do empréstimo por parcela
    findUser.status = 'Em dia';
    findUser.refundStatus = 'Quitada';

    const findInvestor = await this.projectsRepository.findSupporterById(
      userId,
      projectId,
    );

    // Decrementa o valor total a receber de cada investidor
    if (findInvestor) {
      const amount =
        Number(findInvestor.amountToReceive) -
        Number(findInvestor.amountPerInstallment);
      findInvestor.amountToReceive = `${amount.toFixed(2)}`;

      findInvestor.projectState = 'REFUNDING';
      await this.projectsRepository.getAndUpdate(findInvestor);
    }

    await this.supportersRepository.save(findUser);
  }
}

export default SupporterLoanSituationService;
