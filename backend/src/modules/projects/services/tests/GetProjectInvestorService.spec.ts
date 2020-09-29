import AppError from '@shared/errors/AppErrors';

import FakeProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';
import GetProjectInvestorService from '../GetProjectInvestorsService';
import AddSupporterToProjectService from '../AddSupporterToProjectService';

let fakeprojectsRepository: FakeProjectsRepository;
let getInvestors: GetProjectInvestorService;
let addSupporter: AddSupporterToProjectService;

describe('GetProjectInvestor', () => {
  beforeEach(() => {
    fakeprojectsRepository = new FakeProjectsRepository();
    getInvestors = new GetProjectInvestorService(fakeprojectsRepository);
    addSupporter = new AddSupporterToProjectService(fakeprojectsRepository);
  });

  it('should be able to return all investors of an project', async () => {
    await addSupporter.execute({
      amount: '500',
      projectId: 2,
      projectState: 'CATCHING',
      userId: 6,
      projectKind: 'Desporto',
      confirmationToShowPhoto: true,
      amountCorrected: '5',
      amountInterest: '0.5',
      totalInstallments: 12,
      amountPerInstallment: '35',
      totalAmountReceivable: '320',
    });

    const investors = await getInvestors.execute(2);

    expect(investors).toHaveLength(1);
  });

  it('should return an empty array of investors', async () => {
    expect(getInvestors.execute(3)).rejects.toBeInstanceOf(AppError);
  });
});
