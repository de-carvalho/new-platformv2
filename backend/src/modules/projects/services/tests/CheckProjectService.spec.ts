import AppError from '@shared/errors/AppErrors';

import FakeProjectsRepository from '../../repositories/fakes/FakeProjectsRepository';
import CheckProjectService from '../CheckProjectsService';
import FakeProjectRepositoryService from '../fakes/FakeProjectRepositoryService';

let fakeprojectsRepository: FakeProjectsRepository;
let checkProject: CheckProjectService;
let fakeProjectService: FakeProjectRepositoryService;

describe('CheckProjectService', () => {
  beforeEach(() => {
    fakeprojectsRepository = new FakeProjectsRepository();
    checkProject = new CheckProjectService(fakeprojectsRepository);
    fakeProjectService = new FakeProjectRepositoryService(
      fakeprojectsRepository,
    );
  });

  it('should be able to check a user before he creates project', async () => {
    expect(checkProject.execute(5)).rejects.toBeInstanceOf(AppError);

    const user = await fakeProjectService.createUser({
      firstName: 'Nome',
      lastName: 'Sobrenome',
      dob: new Date('2000-08-05'),
      email: 'email@gmail.com',
      cellphoneArea: '11',
      cellphoneNumber: '99099999399',
      addressStreet: 'Rua de endereço sp',
      addressNumber: '99',
      addressComplement: 'Complemento',
      addressDistrict: 'Jardim Iae',
      addressZipcode: '05890130',
      addressCity: 'São Paulo',
      addressState: 'SP',
      taxDocumentType: 'CPF',
      taxDocumentNumber: '239.000.000-43',
      passwordHash: '123456',
      origens: 'Google',
      credit: 'Marketing',
      value: '3000',
      phoneArea: '11',
      phoneNumber: '99099999399',
      accountType: 'PF',
      partnerId: 1,
      moipAccountId: 'M-asfaf9uasf9a',
      moipToken: 'M-fasfna9asfa9v2sfafasv2',
      ownId: '89safh',
      moipCustomerId: 'afii8u9asfa0a',
      role: 'SUPPORTER',
    });

    await expect(checkProject.execute(user.id)).rejects.toBeInstanceOf(
      AppError,
    );

    const user2 = await fakeProjectService.createUser({
      firstName: 'Nome',
      lastName: 'Sobrenome',
      dob: new Date('2000-08-05'),
      email: 'email@gmail.com',
      cellphoneArea: '11',
      cellphoneNumber: '99099999399',
      addressStreet: 'Rua de endereço sp',
      addressNumber: '99',
      addressComplement: 'Complemento',
      addressDistrict: 'Jardim Iae',
      addressZipcode: '05890130',
      addressCity: 'São Paulo',
      addressState: 'SP',
      taxDocumentType: 'CPF',
      taxDocumentNumber: '239.000.000-43',
      passwordHash: '123456',
      origens: 'Google',
      credit: 'Marketing',
      value: '3000',
      phoneArea: '11',
      phoneNumber: '99099999399',
      accountType: 'PF',
      partnerId: 1,
      moipAccountId: 'M-asfaf9uasf9a',
      moipToken: 'M-fasfna9asfa9v2sfafasv2',
      ownId: '89safh',
      moipCustomerId: 'afii8u9asfa0a',
      role: 'ENTREPRENEUR',
    });

    user2.partnerConfirmed = false;

    await expect(checkProject.execute(user2.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to check if the user has a project occurring', async () => {
    const user = await fakeProjectService.createUser({
      firstName: 'Nome',
      lastName: 'Sobrenome',
      dob: new Date('2000-08-05'),
      email: 'email@gmail.com',
      cellphoneArea: '11',
      cellphoneNumber: '99099999399',
      addressStreet: 'Rua de endereço sp',
      addressNumber: '99',
      addressComplement: 'Complemento',
      addressDistrict: 'Jardim Iae',
      addressZipcode: '05890130',
      addressCity: 'São Paulo',
      addressState: 'SP',
      taxDocumentType: 'CPF',
      taxDocumentNumber: '239.000.000-43',
      passwordHash: '123456',
      origens: 'Google',
      credit: 'Marketing',
      value: '3000',
      phoneArea: '11',
      phoneNumber: '99099999399',
      accountType: 'PF',
      partnerId: 1,
      moipAccountId: 'M-asfaf9uasf9a',
      moipToken: 'M-fasfna9asfa9v2sfafasv2',
      ownId: '89safh',
      moipCustomerId: 'afii8u9asfa0a',
      role: 'ENTREPRENEUR',
    });

    await fakeProjectService.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: user.id,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    user.partnerConfirmed = true;

    await expect(checkProject.execute(user.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
