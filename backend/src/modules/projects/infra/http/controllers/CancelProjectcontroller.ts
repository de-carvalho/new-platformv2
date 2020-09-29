/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import { format, addDays } from 'date-fns';

import CancelProjectService from '@modules/projects/services/CancelProjectService';
import ProjectSupporter from '@modules/projects/infra/typeorm/entities/ProjectSupporter';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import moipServices from '@shared/moip/services';
import RefundPaymentService from '@modules/payments/services/RefundPaymentService';
import SupporterLoanSituationService from '@modules/users/services/supporters/SetSupporterLoanSituationService';
import SupporterBankStatementService from '@modules/users/services/supporters/SetSupporterBankStatementService';
import EntrepreneurBankStatementService from '@modules/users/services/entrepreneurs/UpdateEntrepreneurBankStatementService';
import GetEntrepreneurBankStatementToPayService from '@modules/users/services/entrepreneurs/GetBankStatementToPayService';
import EntrepreneurPortfolio from '@modules/users/services/entrepreneurs/UpdateEntrepreneurPortfolioService';

export default class CancelProjectsController {
  public async cancel(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const cancelProject = container.resolve(CancelProjectService);
    const createPayment = container.resolve(RefundPaymentService);
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
    const projectsRepository = getRepository(Project);
    const projectSupporterRepository = getRepository(ProjectSupporter);

    // Busca os dados do projeto para criação do pedido na moip
    const project = await projectsRepository.findOne({
      where: { id: project_id },
    });

    // Vetores que recebem os dados dos investidores
    const investors: (number | string | object | any)[] = [];

    // Busca na tabela projectSupporter todos os investidores do projeto
    const getInvestors = await projectSupporterRepository.find({
      where: { projectId: project_id },
      loadEagerRelations: true,
    });

    // ===Coloca os investidores e os valores a receber em um vetor
    // eslint-disable-next-line func-names
    getInvestors.forEach(function (investor) {
      const amountToReceive = String(investor.amountToReceive).replace('.', '');

      const datas = {
        type: 'PRIMARY',
        feePayor: false,
        moipAccount: {
          id: investor.supporter.moipAccountId,
        },
        amount: {
          fixed: parseInt(amountToReceive),
        },
      };

      investors.push(datas);
    });

    // Caso o projeto não tenha captado nada, apenas cancela sem gerar boleto
    if (Number(project?.raised) <= 0) {
      // Função que cancela o projeto
      await cancelProject.execute({
        projectId: parseInt(`${project_id}`),
        userId: parseInt(`${user_id}`),
      });

      return response.json({ message: 'Projeto cancelado com sucesso' });
    }

    // Função que cancela o projeto
    await cancelProject.execute({
      projectId: parseInt(`${project_id}`),
      userId: parseInt(`${user_id}`),
    });

    // Função que cria o pedido de pagamento na moip para devolver os valores
    const createdOrder = await moipServices.CreateMultiOrder(
      project,
      investors,
      parseInt(String(project?.raised).replace('.', '')),
    );

    // Adiciona mais 18h para o vencimento do boleto
    const dateLimit = addDays(Date.now(), 5);

    // Função cria/faz o multipagamento na moip
    const createdPayment = await moipServices.MultiPaymentBoleto(
      createdOrder.id,
      {
        boletoExpirationDate: format(dateLimit, 'yyyy-MM-dd'),
      },
    );

    // Cadastra no banco de dados os dados do multipagamento
    const payment = await createPayment.execute({
      amount: `${project?.raised}`,
      moipId: createdPayment.id,
      boletoLink: createdPayment.link,
      totalPayees: investors.length,
      projectId: parseInt(`${project?.id}`),
      state: createdPayment.status,
      installments: 0,
      reimburserId: parseInt(`${user_id}`),
      purpose: 'PROJECT_CANCELED',
      moipOrderId: createdOrder.id,
    });

    // Atualiza o estrato bancário do investidor
    await supporterBankStatement.executeOnPayOff(
      getInvestors,
      `Pagamento por cancelamento - projeto ${project?.name}`,
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
