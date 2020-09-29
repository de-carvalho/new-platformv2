import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Withdraw from '../infra/typeorm/entities/Withdraw';
import IWithdrawRepository from '../repositories/IWithdrawRepository';

interface IRequest {
  amount: string;
  bankNumber: string;
  agencyNumber: string;
  bankAccountNumber: string;
  transferMoipId: string;
  userId: number;
  projectId: number;
  state: string;
}

@injectable()
class WithdrawMoneyService {
  constructor(
    @inject('WithdrawRepository')
    private withdraw: IWithdrawRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    amount,
    bankNumber,
    agencyNumber,
    bankAccountNumber,
    projectId,
    userId,
    transferMoipId,
    state,
  }: IRequest): Promise<Withdraw> {
    const findProject = await this.projectsRepository.findById(projectId);

    if (!findProject) {
      throw new AppError('Projeto não encontrado');
    }

    findProject.withdrawn = `${Number(findProject.withdrawn) - Number(amount)}`;

    await this.projectsRepository.save(findProject);

    const withdraw = await this.withdraw.create({
      amount,
      bankNumber,
      agencyNumber,
      userId,
      state,
      bankAccountNumber,
      projectId,
      transferMoipId,
    });

    return withdraw;
  }
}

export default WithdrawMoneyService;
