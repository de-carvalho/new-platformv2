/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetEntrepreneurBankStatementToPayService from '@modules/users/services/entrepreneurs/GetBankStatementToPayService';

export default class GetAllDebtToPayController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { project_id } = request.query;

    const getEntrepreneurBankStatementService = container.resolve(
      GetEntrepreneurBankStatementToPayService,
    );

    const bankStatement = await getEntrepreneurBankStatementService.execute({
      userId: parseInt(`${user_id}`),
      projectId: parseInt(`${project_id}`),
    });

    let installment = 0;
    let projectName = '';

    // Faz a soma do valor total do débito em aberto
    const amountToPay = bankStatement.reduce(function (total, value) {
      installment += 1;
      projectName = value.projectName;

      return total + parseFloat(`${value.amount}`);
    }, 0);

    const amountTotal = amountToPay.toFixed(2);

    const resultData = {
      amountTotal,
      installment,
      projectName,
      status: 'Em dia',
      state: 'A pagar',
    };

    return response.json(resultData);
  }
}
