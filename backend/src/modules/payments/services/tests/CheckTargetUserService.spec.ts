import AppError from '@shared/errors/AppErrors';

import FakeTransfersRepository from '../../repositories/fakes/FakeTransfersRepository';
import CheckTargetUserService from '../CheckTargetUserService';
import FakeCreateTransfersService from '../fakes/FakeCreateTransfersService';

let faketransfersRepository: FakeTransfersRepository;
let fakeCreateTransfers: FakeCreateTransfersService;
let checkTargetUser: CheckTargetUserService;

describe('CheckTargetUserService', () => {
  beforeEach(() => {
    faketransfersRepository = new FakeTransfersRepository();
    fakeCreateTransfers = new FakeCreateTransfersService(
      faketransfersRepository,
    );
    checkTargetUser = new CheckTargetUserService(faketransfersRepository);
  });

  it('should be able to return the target user', async () => {
    const user = await fakeCreateTransfers.createUser({
      firstName: 'John',
      lastName: 'Doe',
      dob: new Date(),
      email: 'johndoe@gmail.com',
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
      taxDocumentNumber: '239.000.000-09',
      passwordHash: '123456',
      origens: 'Google',
      credit: 'Marketing',
      value: '4000',
      phoneArea: '11',
      phoneNumber: '099988798',
      accountType: 'PF',
      partnerId: 1,
      moipAccountId: 'asfa98fas',
      moipToken: 'asfas908uas',
      ownId: 'afas908f',
      moipCustomerId: 'asjfsaop',
      role: ' ENTREPRENEUR',
    });

    expect(
      await checkTargetUser.execute(user.taxDocumentNumber, user.email),
    ).toHaveProperty('id');
  });

  it('should not be able to return a non existing target user', async () => {
    expect(
      checkTargetUser.execute('5325332', 'email@test.com'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
