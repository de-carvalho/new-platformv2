import AppError from '@shared/errors/AppErrors';

import FakeTransfersRepository from '../../repositories/fakes/FakeTransfersRepository';
import CheckLoggedUserService from '../CheckLoggedUserService';
import FakeCreateTransfersService from '../fakes/FakeCreateTransfersService';

let faketransfersRepository: FakeTransfersRepository;
let checkLoggedUser: CheckLoggedUserService;
let fakecreateTransfers: FakeCreateTransfersService;

describe('CheckLoggedUserService', () => {
  beforeEach(() => {
    faketransfersRepository = new FakeTransfersRepository();
    checkLoggedUser = new CheckLoggedUserService(faketransfersRepository);
    fakecreateTransfers = new FakeCreateTransfersService(
      faketransfersRepository,
    );
  });

  it('should be able to check the user', async () => {
    expect(checkLoggedUser.execute(77)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return the user', async () => {
    const user = await fakecreateTransfers.createUser({
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

    expect(await checkLoggedUser.execute(user.id)).toHaveProperty('id');
  });
});
