/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ISupporterBankStatementRepository from '../../repositories/ISupporterBankStatementRepository';

@injectable()
class SupporterBankStatementService {
  constructor(
    @inject('SupporterBankStatementRepository')
    private supportersRepository: ISupporterBankStatementRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  // Função setada no reembolso dos valores ao investidor
  public async execute(investors: any[], purpose: string): Promise<void> {
    if (investors.length === 0) {
      throw new AppError('Nenhum investidor foi encontrado!');
    }

    investors.forEach(async item => {
      await this.supportersRepository.create({
        amount: item.amountPerInstallment,
        purpose,
        userId: item.userId,
      });
    });
  }

  // Função setada no reembolso dos valores ao investidor
  public async executeOnPayOff(
    investors: any[],
    purpose: string,
  ): Promise<void> {
    if (investors.length === 0) {
      throw new AppError('Nenhum investidor foi encontrado!');
    }

    investors.forEach(async item => {
      // Atualiza o estrato bancário do investidor
      await this.supportersRepository.create({
        amount: item.amountToReceive,
        purpose,
        userId: item.userId,
      });

      const investor = await this.projectsRepository.findSupporterById(
        item.userId,
        item.projcetId,
      );

      // Atualiza o estado do projeto e valor que faltava para receber do investidor
      if (investor) {
        investor.amountToReceive = '0.00';
        investor.projectState = 'REFUNDED';
        await this.projectsRepository.getAndUpdate(investor);
      }
    });
  }

  // Função setada no investimento de projetos e transferências
  public async load(
    userId: number,
    amount: number,
    purpose: string,
  ): Promise<void> {
    await this.supportersRepository.create({
      amount,
      purpose,
      userId,
    });
  }
}

export default SupporterBankStatementService;
