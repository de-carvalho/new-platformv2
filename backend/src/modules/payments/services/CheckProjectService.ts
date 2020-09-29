/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

@injectable()
class CheckProjectService {
  constructor(
    @inject('PaymentRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute(
    amount: string,
    projectId: number,
    payorId: number,
  ): Promise<Project> {
    const findProject = await this.paymentsRepository.findProject(projectId);

    if (!findProject) {
      throw new AppError('O projeto não foi encontrado');
    }

    if (findProject.projectType === 2) {
      throw new AppError(
        'Tipo de projeto não habilitado para investimento coletivo',
      );
    }

    // === Verificação do estado do projeto ===
    if (findProject?.state === 'CANCELED') {
      throw new AppError('O projeto foi cancelado e não pode ser investido.');
    }

    if (
      findProject?.state === 'COMPLETED' ||
      findProject?.paymentState === 'REFUNDED' ||
      findProject?.goal === findProject?.raised
    ) {
      throw new AppError(
        'O projeto está concluido e não pode mais ser investido.',
      );
    }

    // === Verificação do valor a ser investido/pago ===
    if (parseFloat(amount) > parseFloat(`${findProject?.goal}`)) {
      throw new AppError(
        'O valor a ser investido deve ser menor ou igual ao valor do projeto.',
      );
    }

    // Verifica o valor a ser investido, não podendo ser maior ao valor que falta
    // para ser investido
    if (
      parseFloat(amount) >
      parseFloat(`${findProject?.goal}`) - parseFloat(`${findProject?.raised}`)
    ) {
      throw new AppError(
        `O valor a ser investido deve ser menor ou igual a R$ ${
          parseFloat(`${findProject?.goal}`) -
          parseFloat(`${findProject?.raised}`)
        },00`,
      );
    }

    const findUser = await this.paymentsRepository.findUser(payorId);

    if (!findUser || findUser.role === 'ENTREPRENEUR') {
      throw new AppError('Usuário não habilitado para investir');
    }

    return findProject;
  }
}

export default CheckProjectService;
