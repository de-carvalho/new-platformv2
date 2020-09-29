/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IRefundPaymentsRepository from '../repositories/IRefundPaymentRepository';

@injectable()
class CheckProjectToRefundService {
  constructor(
    @inject('RefundPaymentRepository')
    private paymentsRepository: IRefundPaymentsRepository,
  ) {}

  public async execute(
    amount: string,
    projectId: number,
    entrepreneurId: number,
    installment: number,
    payOffDebt: boolean,
  ): Promise<Project> {
    // Busca os dados do projeto para criação do pedido na moip
    const findProject = await this.paymentsRepository.findProject(projectId);

    if (!findProject) {
      throw new AppError('O projeto não foi encontrado');
    }

    // === Verificação do proprietário do projeto com o usuário logado
    if (findProject.entrepreneurId !== entrepreneurId) {
      throw new AppError(
        'Você não é próprietário do projeto, não pode reembolsá-lo.',
      );
    }

    // === Verificação do estado do projeto ===
    if (findProject.state === 'CANCELED') {
      throw new AppError('O projeto foi cancelado.');
    }

    if (findProject.state === 'CATCHING') {
      throw new AppError('O projeto ainda está em andamento.');
    }

    // Verificação da situação do reembolso dos valores
    if (
      findProject.paymentState === 'REFUNDED' ||
      findProject.totalToPayback === findProject.paidback
    ) {
      throw new AppError('Você já terminou de reembolsar o projeto.');
    }

    if (Number(findProject.raised) <= 0) {
      throw new AppError(
        'Você não arrecadou nenhum valor para ser reembolsado',
      );
    }

    if (
      Number(amount) >
      Number(findProject.totalToPayback) - Number(findProject.paidback)
    ) {
      throw new AppError(
        `O valor a ser pago deve ser menor ou igual a R$ ${
          Number(findProject.totalToPayback) - Number(findProject.paidback)
        },00`,
      );
    }

    // Verifcação do pagamento das parcelas
    const findInstallment = await this.paymentsRepository.findProjectStatement(
      entrepreneurId,
      projectId,
      installment,
    );

    if (findInstallment?.state === 'Quitada') {
      throw new AppError('Você já pagou essa parcela.');
    }

    if (parseInt(`${findInstallment?.installment}`) > 1) {
      const previousInstallment = await this.paymentsRepository.findProjectStatement(
        entrepreneurId,
        projectId,
        installment - 1,
      );

      if (previousInstallment?.state === 'A pagar' && payOffDebt === false) {
        throw new AppError('Você ainda não pagou a parcela anterior a essa.');
      }
    }

    return findProject;
  }
}

export default CheckProjectToRefundService;
