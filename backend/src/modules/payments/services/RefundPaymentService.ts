/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import RefundPayment from '../infra/typeorm/entities/RefundPayment';
import IRefundPaymentsRepository from '../repositories/IRefundPaymentRepository';

interface IRequest {
  amount: string;
  projectId: number;
  reimburserId: number;
  state: string;
  moipId: string;
  boletoLink: string;
  totalPayees: number;
  installments: number;
  purpose: string;
  moipOrderId: string;
  payOff?: boolean;
}

@injectable()
class RefundPaymentService {
  constructor(
    @inject('RefundPaymentRepository')
    private paymentsRepository: IRefundPaymentsRepository,
  ) {}

  public async execute({
    amount,
    reimburserId,
    moipId,
    boletoLink,
    totalPayees,
    projectId,
    state,
    installments,
    purpose,
    moipOrderId,
    payOff,
  }: IRequest): Promise<RefundPayment> {
    const findProject = await this.paymentsRepository.findProject(projectId);

    if (!findProject) {
      throw new AppError('O projeto não foi encontrado');
    }

    // Cria o reembolso no banco de dados
    const payment = await this.paymentsRepository.create({
      amount,
      reimburserId,
      moipId,
      boletoLink,
      totalPayees,
      projectId,
      state,
      installments,
      purpose,
      moipOrderId,
    });

    findProject.installmentsPayed = installments;

    // Incrementa o valor já pago com valor da parcela que está sendo paga
    findProject.paidback = `${Number(findProject.paidback) + Number(amount)}`;

    // Verifica o valor  que já foi pago com o que resta para ser pago
    // caso seja igual, atualiza o estado de pagamento do projeto para REFUNDED
    if (findProject.paidback === findProject.totalToPayback) {
      findProject.paymentState = 'REFUNDED';
    } else {
      findProject.paymentState = 'REFUNDING';
    }

    if (payOff) {
      findProject.paymentState = 'REFUNDED';
      findProject.installmentsPayed += installments;
    }

    await this.paymentsRepository.updateProject(findProject);

    return payment;
  }
}

export default RefundPaymentService;
