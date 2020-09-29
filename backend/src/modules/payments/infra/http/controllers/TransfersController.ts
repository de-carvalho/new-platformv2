/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import moipServices from '@shared/moip/services';
import CreateTransfersService from '@modules/payments/services/CreateTransfersService';
import SupporterBankStatementService from '@modules/users/services/supporters/SetSupporterBankStatementService';
import CheckTargetUserService from '@modules/payments/services/CheckTargetUserService';
import CheckLoggedUserService from '@modules/payments/services/CheckLoggedUserService';
import CheckUserBalanceService from '@modules/payments/services/CheckUserBalanceService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { amount, fullname, accountType, bankNumber } = request.body;
    const { agencyNumber, agencyCheckNumber, accountNumber } = request.body;
    const { accountCheckNumber, method, email } = request.body;
    const { taxDocumentNumber, taxDocumentType } = request.body;

    const createTransfers = container.resolve(CreateTransfersService);
    const checkUserBalance = container.resolve(CheckUserBalanceService);
    const checkLoggedUser = container.resolve(CheckLoggedUserService);
    const checkTargetUser = container.resolve(CheckTargetUserService);
    const supporterBankStatement = container.resolve(
      SupporterBankStatementService,
    );

    // Busca no banco de dados o usuário destinatário da transferência
    const targetUser = await checkTargetUser.execute(taxDocumentNumber, email);

    // Verifica existência do usuário e seu saldo
    const user = await checkLoggedUser.execute(parseInt(`${user_id}`));
    await checkUserBalance.execute(parseInt(`${user_id}`), amount);

    // Objeto com os dados do destinatário da transferência
    const dataBankTransfers = {
      fullname,
      amount,
      bankAccountType: accountType,
      bankNumber,
      agencyNumber,
      agencyCheckNumber,
      accountNumber,
      accountCheckNumber,
      method,
      taxDocumentType,
      taxDocumentNumber,
    };

    // Objeto  com os dados do destinatário da transferência entre contas firgun
    const dataFirgunTransfers = {
      amount,
      moipAccountId: targetUser.moipAccountId,
    };

    // Processo de transferência na moip em função do tipo
    // de conta/método selecionado
    let createdTransfers = null;
    if (method === 'BANK_ACCOUNT') {
      createdTransfers = await moipServices.TransfersCreate(
        dataBankTransfers,
        user.moipToken,
      );
    }
    if (method === 'MOIP_ACCOUNT') {
      createdTransfers = await moipServices.FirgunTransfersCreate(
        dataFirgunTransfers,
        user.moipToken,
      );
    }

    // Cadastra no banco de dados os dados da transferência
    const transfers = await createTransfers.execute({
      fullname,
      amount,
      bankNumber,
      accountNumber,
      accountType,
      agencyNumber,
      method,
      accountCheckNumber,
      agencyCheckNumber,
      state: createdTransfers.status,
      moipTransfersId: createdTransfers.id,
      payeeId: targetUser.id,
      taxDocumentNumber,
      taxDocumentType,
      userId: parseInt(`${user_id}`),
    });

    await supporterBankStatement.load(
      parseInt(`${user_id}`),
      amount,
      `Transferência para ${fullname}`,
    );

    return response.json(transfers);
  }
}
