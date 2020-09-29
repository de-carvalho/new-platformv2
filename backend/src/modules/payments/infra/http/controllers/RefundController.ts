/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import { format, addHours } from 'date-fns';

import ProjectSupporter from '@modules/projects/infra/typeorm/entities/ProjectSupporter';
import moipServices from '@shared/moip/services';
import RefundPaymentService from '@modules/payments/services/RefundPaymentService';
import SupporterLoanSituationService from '@modules/users/services/supporters/SetSupporterLoanSituationService';
import SupporterBankStatementService from '@modules/users/services/supporters/SetSupporterBankStatementService';
import EntrepreneurBankStatementService from '@modules/users/services/entrepreneurs/UpdateEntrepreneurBankStatementService';
import EntrepreneurPortfolio from '@modules/users/services/entrepreneurs/UpdateEntrepreneurPortfolioService';
import CheckProjectService from '@modules/payments/services/CheckProjectToRefundService';
import GetEntrepreneurBankStatement from '@modules/users/services/entrepreneurs/GetBankStatementByInstallmentService';

export default class RefundController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const { amount, installments, purpose } = request.body;

    const value = Number(String(amount));

    const createPayment = container.resolve(RefundPaymentService);
    const checkProject = container.resolve(CheckProjectService);
    const entrepreneurBankStatementByInstallment = container.resolve(
      GetEntrepreneurBankStatement,
    );
    const entrepreneurPortfolio = container.resolve(EntrepreneurPortfolio);
    const supporterLoanSituation = container.resolve(
      SupporterLoanSituationService,
    );
    const supporterBankStatement = container.resolve(
      SupporterBankStatementService,
    );
    const entrepreneurBankStatement = container.resolve(
      EntrepreneurBankStatementService,
    );
    const projectSupporterRepository = getRepository(ProjectSupporter);

    // Função que verifica o estado do projeto e o valor a ser pago
    const project = await checkProject.execute(
      String(value),
      parseInt(`${project_id}`),
      parseInt(`${user_id}`),
      installments,
      false, // confirma que a dívida não está sendo quitada por inteira
    );

    // Vetor que recebe os dados dos investidores
    const investors: (number | string | object | any)[] = [];

    // Busca na tabela projectSupporter todos os investidores do projeto
    const getInvestors = await projectSupporterRepository.find({
      where: { projectId: project_id },
      loadEagerRelations: true,
    });

    // ===Coloca os investidores e os valores a receber em um vetor
    // eslint-disable-next-line func-names
    getInvestors.forEach(function (investor) {
      const amountInstallment = String(investor.amountPerInstallment).replace(
        '.',
        '',
      );

      const datas = {
        type: 'PRIMARY',
        feePayor: false,
        moipAccount: {
          id: investor.supporter.moipAccountId,
        },
        amount: {
          fixed: parseInt(amountInstallment),
        },
      };

      investors.push(datas);
    });

    // Busca no banco de dados o registro da parcela a ser paga e verifica
    // a sua data de vencimento
    const entrepreneurStatement = await entrepreneurBankStatementByInstallment.execute(
      {
        userId: parseInt(user_id),
        installment: installments,
        projectId: parseInt(`${project_id}`),
      },
    );

    // Função que cria o pedido de pagamento na moip para devolver os valores
    const createdOrder = await moipServices.CreateMultiOrder(
      project,
      investors,
      parseInt(String(value).replace('.', '')),
    );

    // Adiciona mais 18h para o vencimento do boleto
    const dueDateCreatedAt = String(entrepreneurStatement.dueDate).split('-');

    const dueDate = new Date(
      Number(dueDateCreatedAt[0]),
      Number(dueDateCreatedAt[1]),
      Number(dueDateCreatedAt[2]),
    );
    const dateLimit = addHours(dueDate, 10);

    // Função cria/faz o multipagamento na moip
    const createdPayment = await moipServices.MultiPaymentBoleto(
      createdOrder.id,
      {
        boletoExpirationDate: format(dateLimit, 'yyyy-MM-dd'),
        instalment: installments,
      },
    );

    getInvestors.map(async item => {
      await supporterLoanSituation.executeOnRefund(
        item.userId,
        item.projectId,
        installments,
      );
    });

    const [payment] = await Promise.all([
      await createPayment.execute({
        amount: String(value),
        moipId: createdPayment.id,
        boletoLink: createdPayment.link,
        totalPayees: investors.length,
        projectId: project?.id,
        state: createdPayment.status,
        installments,
        reimburserId: parseInt(`${user_id}`),
        purpose,
        moipOrderId: createdOrder.id,
      }),
      await entrepreneurPortfolio.execute(
        parseInt(`${user_id}`),
        parseInt(`${project_id}`),
        installments,
      ),
      await supporterBankStatement.execute(
        getInvestors,
        `Pagamento projeto ${project?.name}`,
      ),
      await entrepreneurBankStatement.execute(
        parseInt(`${user_id}`),
        installments,
        parseInt(`${project_id}`),
      ),
    ]);

    Object.assign(payment, { lineCode: createdPayment.lineCode });

    return response.json(payment);
  }
}
