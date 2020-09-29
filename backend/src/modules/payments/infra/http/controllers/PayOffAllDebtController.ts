/* eslint-disable no-await-in-loop */
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
import GetEntrepreneurBankStatementToPayService from '@modules/users/services/entrepreneurs/GetBankStatementToPayService';
import EntrepreneurPortfolio from '@modules/users/services/entrepreneurs/UpdateEntrepreneurPortfolioService';
import CheckProjectToRefundService from '@modules/payments/services/CheckProjectToRefundService';

export default class RefundController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const { amount, installments, purpose } = request.body;

    const value = Number(String(amount));

    const createPayment = container.resolve(RefundPaymentService);
    const checkProjectToRefund = container.resolve(CheckProjectToRefundService);
    const supporterLoanSituation = container.resolve(
      SupporterLoanSituationService,
    );
    const supporterBankStatement = container.resolve(
      SupporterBankStatementService,
    );
    const entrepreneurBankStatement = container.resolve(
      EntrepreneurBankStatementService,
    );
    const getEntrepreneurBankStatementService = container.resolve(
      GetEntrepreneurBankStatementToPayService,
    );
    const entrepreneurPortfolio = container.resolve(EntrepreneurPortfolio);
    const projectSupporterRepository = getRepository(ProjectSupporter);

    // Função que verifica o estado do projeto e o valor a ser reembolsado
    const project = await checkProjectToRefund.execute(
      String(value),
      parseInt(`${project_id}`),
      parseInt(`${user_id}`),
      installments,
      true, // para confirmar que o débito está sendo quitado
    );

    // Vetor que recebe os dados dos investidores
    const investors: (number | string | object | any)[] = [];

    // Busca na tabela payments todos os investidores do projeto
    const getInvestors = await projectSupporterRepository.find({
      where: { projectId: project_id },
      loadEagerRelations: true,
    });

    // ===Coloca os investidores e os valores a receber em um vetor
    // eslint-disable-next-line func-names
    getInvestors.forEach(function (investor) {
      const data = {
        moipAccountId: investor.supporter.moipAccountId,
        amount: investor.amountToReceive,
      };
      investors.push(data);
    });

    // Função que cria o pedido de pagamento na moip para devolver os valores
    const createdOrder = await moipServices.CreateMultiOrder(
      project,
      investors,
      parseInt(String(value).replace('.', '')),
    );

    // Adiciona mais 18h para o vencimento do boleto
    const dateLimit = addHours(Date.now(), 18);

    // Função cria/faz o multipagamento na moip
    const createdPayment = await moipServices.MultiPaymentBoleto(
      createdOrder.id,
      {
        boletoExpirationDate: format(dateLimit, 'yyyy-MM-dd'),
        instalment: installments,
      },
    );

    // Cadastra no banco de dados os dados do multipagamento
    const payment = await createPayment.execute({
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
    });

    // Atualiza o estrato bancário do investidor
    await supporterBankStatement.executeOnPayOff(
      getInvestors,
      `Pagamento projeto ${project?.name}`,
    );

    const bankStatement = await getEntrepreneurBankStatementService.execute({
      userId: parseInt(`${user_id}`),
      projectId: parseInt(`${project_id}`),
    });

    // Atualiza o estado das parcelas
    bankStatement.map(async data => {
      await entrepreneurBankStatement.execute(
        parseInt(`${user_id}`),
        data.installment,
        parseInt(`${project_id}`),
      );

      // Cadastra os recebimentos de empréstimos dos investidores
      getInvestors.map(async item => {
        await supporterLoanSituation.executeOnRefund(
          item.userId,
          item.projectId,
          data.installment,
        );
      });

      // Atualiza a carteira do empreendedor - (Parceiro)
      await entrepreneurPortfolio.execute(
        parseInt(`${user_id}`),
        parseInt(`${project_id}`),
        data.installment,
      );
    });

    Object.assign(payment, { lineCode: createdPayment.lineCode });

    return response.json(payment);
  }
}
