import { getRepository, Repository } from 'typeorm';

import IRefundPaymentsRepository from '@modules/payments/repositories/IRefundPaymentRepository';
import IRefundPaymentDTO from '@modules/payments/dtos/ICreateRefundDTO';
import EntrepreneurBankStatement from '@modules/users/infra/typeorm/entities/EntrepreneurBankStatement';

import Project from '@modules/projects/infra/typeorm/entities/Project';

import RefundPayment from '../entities/RefundPayment';

class RefundPaymentsRepository implements IRefundPaymentsRepository {
  private ormRepository: Repository<RefundPayment>;

  private projectRepository: Repository<Project>;

  private entrepreneurBankStatementRepository: Repository<
    EntrepreneurBankStatement
  >;

  constructor() {
    this.ormRepository = getRepository(RefundPayment);
    this.projectRepository = getRepository(Project);
    this.entrepreneurBankStatementRepository = getRepository(
      EntrepreneurBankStatement,
    );
  }

  // Procura o projeto no banco de dados pelo id do projeto
  public async findProject(projectId: number): Promise<Project | undefined> {
    const findProjectExistence = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    return findProjectExistence;
  }

  public async findProjectStatement(
    userId: number,
    projectId: number,
    installment: number,
  ): Promise<EntrepreneurBankStatement | undefined> {
    const findProjectStatement = await this.entrepreneurBankStatementRepository.findOne(
      {
        where: { userId, projectId, installment },
      },
    );

    return findProjectStatement;
  }

  // Cria o pagamento do reembolso do investimento no projeto
  public async create(data: IRefundPaymentDTO): Promise<RefundPayment> {
    const payment = this.ormRepository.create(data);

    await this.ormRepository.save(payment);

    return payment;
  }

  // Atualiza os dados do projeto depois do reembolso ter sido feito
  // dados como: paidback
  public async updateProject(data: Project): Promise<Project> {
    return this.projectRepository.save(data);
  }
}

export default RefundPaymentsRepository;
