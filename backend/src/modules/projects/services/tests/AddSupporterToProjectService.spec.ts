import FakeProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';
import AddSupporterToProjectService from '../AddSupporterToProjectService';

let fakeprojectsRepository: FakeProjectsRepository;
let addSupporter: AddSupporterToProjectService;

describe('AddSupporterToProject', () => {
  beforeEach(() => {
    fakeprojectsRepository = new FakeProjectsRepository();
    addSupporter = new AddSupporterToProjectService(fakeprojectsRepository);
  });

  it('should be able to add a new supporter to project', async () => {
    const supporter = await addSupporter.execute({
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

    expect(supporter).toHaveProperty('id');
    expect(supporter.userId).toBe(6);
    expect(supporter.projectState).toBe('CATCHING');
  });
});
