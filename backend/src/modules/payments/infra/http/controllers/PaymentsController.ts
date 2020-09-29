/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import moipServices from '@shared/moip/services';
import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import AddSupporterToProject from '@modules/projects/services/AddSupporterToProjectService';
import SupporterBankStatementService from '@modules/users/services/supporters/SetSupporterBankStatementService';
import SupporterLoanSituationService from '@modules/users/services/supporters/SetSupporterLoanSituationService';
import CheckProjectService from '@modules/payments/services/CheckProjectService';
import InterestService from '@modules/calculations/services/SupporterInterestService';

export default class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const { paymentType, value, confirmationToShowPhoto } = request.body;
    const { name, taxDocumentType, birthdate, creditCardCvc } = request.body;
    const { creditCardNumber, creditCardExpirationMonth } = request.body;
    const { creditCardExpirationYear, taxDocumentNumber } = request.body;

    // Objeto com os dados do portador do cartão de crédito
    const holder = {
      name,
      taxDocumentType,
      taxDocumentNumber,
      creditCardCvc,
      birthdate,
      creditCardNumber,
      creditCardExpirationMonth,
      creditCardExpirationYear,
    };

    const createPayment = container.resolve(CreatePaymentService);
    const checkProject = container.resolve(CheckProjectService);
    const addSupporter = container.resolve(AddSupporterToProject);
    const supporterBankStatement = container.resolve(
      SupporterBankStatementService,
    );
    const supporterLoanSituation = container.resolve(
      SupporterLoanSituationService,
    );
    const calcsInterest = container.resolve(InterestService);

    const usersRepository = getRepository(User);

    // Busca no banco de dados o usuário logado para criação do pedido na moip
    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    // Função que verifica o estado do projeto e o valor a ser investido
    const project = await checkProject.execute(
      value,
      parseInt(`${project_id}`),
      parseInt(`${user_id}`),
    );

    // Função que cria o pedido de pagamento na moip para investimento
    const createdOrder = await moipServices.CreateOrder(
      user,
      project,
      parseInt(`${value}00`),
    );

    // Processo de pagamento/investimento do projeto na moip em função do tipo de
    // pagamento do usuário logado
    let createdPayment = null;
    if (paymentType === 'BOLETO') {
      createdPayment = await moipServices.PaymentBoleto(createdOrder.id);
    } else {
      createdPayment = await moipServices.PaymentCreditCard(
        createdOrder.id,
        holder,
      );
    }

    // Calcula o valor total e o valor por parcela do investidor e a taxa
    const interestResult = await calcsInterest.execute({
      amountEntrepreneur: project.goal,
      amount: value,
      times: project.installmentsPrediction,
      balanceDue: value,
    });

    const [payment] = await Promise.all([
      createPayment.execute({
        amount: value,
        moipId: createdPayment.id,
        boletoLink: createdPayment.link,
        payeeId: project?.entrepreneurId,
        payorId: parseInt(`${user_id}`),
        projectId: parseInt(`${project_id}`),
        purpose: 'INVESTIMENT',
        state: createdPayment.status,
      }),

      // Cadastra no banco de dados/tabela projectssupporters o investidor e alguns
      // dados do projeto
      addSupporter.execute({
        amount: value, // Valor insvestido
        projectValue: project.goal, // valor do projeto
        projectId: parseInt(`${project_id}`),
        projectState: `${project?.state}`,
        userId: parseInt(`${user_id}`),
        projectKind: project?.category,
        confirmationToShowPhoto,
        amountCorrected: interestResult.amountCorrected, // valor corrigido
        amountInterest: interestResult.monthyInterest, // valor do juro
        totalInstallments: parseInt(`${project?.installmentsPrediction}`),
        amountPerInstallment: interestResult.installmentAmount, // Valor que o investidor irá por parcela
        totalAmountReceivable: interestResult.amountTotalToReceive, // Valor total que o investidor irá por parcela
        amountToReceive: interestResult.amountTotalToReceive,
      }),

      // Registra o extrato bancário do investidor
      supporterBankStatement.load(
        parseInt(`${user_id}`),
        value,
        `Investimento projeto ${project?.name}`,
      ),

      await supporterLoanSituation.execute({
        projectName: `${project?.name}`,
        amountInvested: value,
        amountReceived: interestResult.installmentAmount, // valor que o investidor irá receber por parcela
        projectId: parseInt(`${project_id}`),
        refundStatus: 'A receber',
        status: 'Em dia',
        totalInstallments: parseInt(`${project?.installmentsPrediction}`),
        userId: parseInt(`${user_id}`),
        projectAmount: project.goal,
      }),
    ]);

    if (paymentType === 'BOLETO')
      Object.assign(payment, { lineCode: createdPayment.lineCode });

    return response.json(payment);
  }
}
