import { injectable, inject } from 'tsyringe';

import InterestRepository from '@modules/calculations/repositories/InterestRepository';
import ProjectSupporter from '../infra/typeorm/entities/ProjectSupporter';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  amount: string;
  projectValue: string;
  projectId: number;
  userId: number;
  amountPerInstallment: string;
  amountCorrected: string;
  totalInstallments: number;
  amountInterest: string;
  projectState: string;
  projectKind: string;
  confirmationToShowPhoto: boolean;
  totalAmountReceivable: string;
  amountToReceive: string;
}
@injectable()
class AddProjectSupporterService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('InterestRepository')
    private interest: InterestRepository,
  ) {}

  public async execute({
    amount,
    projectValue,
    amountPerInstallment,
    projectId,
    projectState,
    userId,
    projectKind,
    confirmationToShowPhoto,
    amountCorrected,
    amountInterest,
    totalInstallments,
    totalAmountReceivable,
    amountToReceive,
  }: IRequest): Promise<ProjectSupporter> {
    const findInvestor = await this.projectsRepository.findSupporterById(
      userId,
      projectId,
    );

    if (findInvestor) {
      findInvestor.amount = `${Number(findInvestor.amount) + Number(amount)}`;

      const interestSupporter = await this.interest.supporterAmount(
        findInvestor.amount,
        projectValue, // valor do projeto
        findInvestor.amount,
        findInvestor.totalInstallments,
      );

      findInvestor.totalAmountReceivable = `${interestSupporter.amountTotal.toFixed(
        2,
      )}`;

      findInvestor.amountPerInstallment = `${interestSupporter.installmentAmount.toFixed(
        2,
      )}`;
      findInvestor.amountInterest = `${interestSupporter.monthyInterest}`;

      const investorUpdated = await this.projectsRepository.getAndUpdate(
        findInvestor,
      );

      return investorUpdated;
    }

    const supporter = await this.projectsRepository.addSupporterToProject({
      amount,
      amountPerInstallment,
      projectId,
      projectState,
      userId,
      projectKind,
      confirmationToShowPhoto,
      amountCorrected,
      amountInterest,
      totalInstallments,
      totalAmountReceivable,
      amountToReceive,
    });
    return supporter;
  }
}

export default AddProjectSupporterService;
