/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import moipServices from '@shared/moip/services';
import WithDrawnMoneyService from '@modules/users/services/supporters/WithdrawnMoneyService';
import CheckUserBalanceService from '@modules/users/services/supporters/CheckUserBalance';
import CheckUserService from '@modules/users/services/supporters/CheckUserService';

export default class UpdateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { amount } = request.body;

    const withDrawnMoneyService = container.resolve(WithDrawnMoneyService);
    const checkUserBalance = container.resolve(CheckUserBalanceService);
    const checkUser = container.resolve(CheckUserService);

    const user = await checkUser.execute(parseInt(`${user_id}`));

    await checkUserBalance.execute(parseInt(`${user_id}`), amount);

    const dataBankTransfers = {
      fullname: `${user?.firstName} + ${user?.lastName}`,
      amount: parseInt(amount),
      bankAccountType: user?.bankAccountType,
      bankNumber: user?.bankNumber,
      agencyNumber: user?.bankAgencyNumber,
      agencyCheckNumber: user?.bankAgencyCheckNumber,
      accountNumber: user?.bankAccountNumber,
      accountCheckNumber: user?.bankAccountCheckNumber,
      method: 'BANK_ACCOUNT',
      taxDocumentType: user?.taxDocumentType,
      taxDocumentNumber: user?.taxDocumentNumber,
    };

    const transfers = await moipServices.TransfersCreate(
      dataBankTransfers,
      user?.moipToken,
    );

    const supporterDatas = await withDrawnMoneyService.execute({
      fullname: `${user?.firstName} ${user?.lastName}`,
      taxDocumentType: user?.taxDocumentType,
      taxDocumentNumber: user?.taxDocumentNumber,
      amount,
      accountCheckNumber: user?.bankAccountCheckNumber,
      accountNumber: parseInt(user?.bankAccountNumber),
      accountType: user?.bankAccountType,
      agencyCheckNumber: user?.bankAgencyCheckNumber,
      agencyNumber: user?.bankAgencyNumber,
      bankNumber: user?.bankNumber,
      method: 'BANK_ACCOUNT',
      moipTransfersId: transfers.id,
      state: transfers.status,
      userId: parseInt(`${user_id}`),
      payeeId: user?.id,
    });

    return response.json(supporterDatas);
  }
}
