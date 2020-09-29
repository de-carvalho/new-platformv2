/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import moipServices from '@shared/moip/services';
import CheckProjectBalanceService from '@modules/payments/services/CheckProjectBalanceService';
import CheckUserService from '@modules/payments/services/CheckLoggedUserService';
import Withdraw from '@modules/payments/services/WithdrawMoneyService';
import Interest from '@modules/calculations/services/FirgunInterestService';

export default class WithdrawnMoneyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const { amount } = request.body;

    const checkProjectBalance = container.resolve(CheckProjectBalanceService);
    const findUser = container.resolve(CheckUserService);
    const withdraw = container.resolve(Withdraw);
    const interest = container.resolve(Interest);
    const projectsRepository = getRepository(Project);

    // Verificao usuário e o projeto
    const user = await findUser.execute(parseInt(`${user_id}`));
    await checkProjectBalance.execute(
      parseInt(`${project_id}`),
      amount,
      parseInt(`${user_id}`),
    );

    const project = await projectsRepository.findOne({
      where: { id: project_id },
    });

    // ===== DADOS DA FIRGUN, VALOR E ID DA CONTA MOIP ====
    const firgunInterest = await interest.execute({ amount });

    const firgunBankData = {
      amount: firgunInterest.firgunAmount,
      moipAccountId: String(process.env.FIRGUN_MOIP_ACCOUNT_ID),
    };

    // Processo de transferência para firgun
    await moipServices.FirgunTransfersCreate(
      firgunBankData,
      `${project?.moipToken}`,
    );
    // ===== FIM - DADOS DA FIRGUN, VALOR A RECEBER (8%) E ID DA CONTA MOIP ====

    // Objeto com os dados do destinatário da transferência (Empreendedor)
    const dataBankTransfers = {
      fullname: `${user.firstName} ${user.lastName}`,
      amount: parseInt(firgunInterest.entrepreneurAmount),
      bankAccountType: user.bankAccountType,
      bankNumber: user.bankNumber,
      agencyNumber: user.bankAgencyNumber,
      agencyCheckNumber: user.bankAgencyCheckNumber,
      accountNumber: user.bankAccountNumber,
      accountCheckNumber: user.bankAccountCheckNumber,
      method: 'BANK_ACCOUNT',
      taxDocumentType: user.taxDocumentType,
      taxDocumentNumber: user.taxDocumentNumber,
    };

    // Processo de transferência para conta do empreendedor
    const createdTransfers = await moipServices.TransfersCreate(
      dataBankTransfers,
      `${project?.moipToken}`, // acess token da conta do projeto
    );

    // Cadastra no banco de dados os dados da transferência
    const withdrawMoney = await withdraw.execute({
      amount: firgunInterest.entrepreneurAmount,
      bankNumber: user.bankNumber,
      bankAccountNumber: user.bankAccountNumber,
      agencyNumber: user.bankAgencyNumber,
      state: createdTransfers.status,
      transferMoipId: createdTransfers.id,
      projectId: parseInt(`${project_id}`),
      userId: parseInt(`${user_id}`),
    });

    return response.json(withdrawMoney);
  }
}
