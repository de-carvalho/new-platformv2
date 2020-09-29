/* eslint-disable no-await-in-loop */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import { addDays, addMonths } from 'date-fns';

import AppError from '@shared/errors/AppErrors';
import User from '@modules/users/infra/typeorm/entities/User';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import EntrepreneurLoanMoneyService from '@modules/users/services/entrepreneurs/LoanMoneyService';
import CheckUserService from '@modules/users/services/entrepreneurs/CheckUserService';
import SetEntrepreneurBankStatement from '@modules/users/services/entrepreneurs/SetBankStatementService';
import EntrepreneurPortfolio from '@modules/users/services/entrepreneurs/EntrepreneurPortfolioService';
import InterestService from '@modules/calculations/services/InterestService';

export default class LoanMoneyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const { amountWanted, receiveDate, projectType } = request.body;
    const { totalInstallments, amountToPayback } = request.body;
    const { percentageFee, amountPerInstallment } = request.body;
    const { confirmedByEntrepreneur, gracePeriod } = request.body;

    // Instanciando as classes
    const entrepreneurLoanMoneyService = container.resolve(
      EntrepreneurLoanMoneyService,
    );
    const checkUser = container.resolve(CheckUserService);
    const entrepreneurBankStatement = container.resolve(
      SetEntrepreneurBankStatement,
    );
    const entrepreneurPortfolio = container.resolve(EntrepreneurPortfolio);
    const calcsInterest = container.resolve(InterestService);
    // Fim - Instanciando as classes

    const projectRepository = getRepository(Project);
    const usersRepository = getRepository(User);

    const project = await projectRepository.findOne({
      where: { id: project_id },
    });

    const user = await usersRepository.findOne(parseInt(`${user_id}`));

    if (!project) {
      throw new AppError('Projeto não encontrado');
    }

    await checkUser.execute(parseInt(`${user_id}`), parseInt(`${project_id}`));

    const interestResult = await calcsInterest.execute({
      interest: percentageFee,
      amount: amountWanted,
      times: totalInstallments,
    });

    const loanService = await entrepreneurLoanMoneyService.execute({
      entrepreneurId: parseInt(`${user_id}`),
      projectId: parseInt(`${project_id}`),
      amountWanted,
      receiveDate,
      gracePeriod,
      totalInstallments,
      amountPerInstallment,
      percentageFee: interestResult.monthlyInterest,
      projectType,
      amountToPayback,
      confirmedByEntrepreneur,
      partnerAmount: interestResult.partnerAmountTotal, // valor total do parceiro
      firgunAmount: interestResult.firgunAmountTotal, // valor total da firgun
    });

    for (let i = 1; i <= totalInstallments; i += 1) {
      // Tratamento da data de vencimento dos boletos em cada mês
      const currentDate = new Date(gracePeriod);
      let dueDateLimit;

      let addedMonth = addMonths(currentDate, i);
      const addedDay = addDays(addedMonth, 1);

      if (!(addedMonth.getDay() % 6) || !(addedDay.getDay() % 6)) {
        addedMonth = addDays(addedMonth, 1);

        if (!(addedMonth.getDay() % 6)) {
          addedMonth = addDays(addedMonth, 1);
        }

        dueDateLimit = addedMonth;
      } else {
        dueDateLimit = addedMonth;
      }
      // Fim - Tratamento da data de vencimento dos boletos

      // Registra todos os pagamentos que serão feitos pelo empreendedor, por parcela
      await Promise.all([
        entrepreneurBankStatement.execute({
          amount: amountPerInstallment, // valor de cada boleto a ser pago, o mesmo para todos
          dueDate: dueDateLimit, // data de expiração de cada boleto
          installment: i, // parcela a ser paga
          state: 'A pagar',
          status: 'Em dia',
          userId: parseInt(`${user_id}`),
          projectId: parseInt(`${project_id}`),
          projectName: project.name,
        }),

        entrepreneurPortfolio.execute({
          userId: parseInt(`${user_id}`),
          userName: `${user?.firstName} ${user?.lastName}`,
          projectId: parseInt(`${project_id}`),
          projectName: project.name,
          amountCaptured: project.raised,
          requestedAmount: amountWanted,
          percentageFee: String(percentageFee),
          installment: i,
          signupDate: new Date(project.creationDate),
          status: 'Em dia',
          state: 'A pagar',
          partnerId: parseInt(`${project.partnerId}`),
          receiptDate: dueDateLimit,
        }),
      ]);
    }

    return response.json(loanService);
  }
}
