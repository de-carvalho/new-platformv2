import FakeTransfersRepository from '../../repositories/fakes/FakeTransfersRepository';
import CreateTransfersService from '../CreateTransfersService';

let faketransfersRepository: FakeTransfersRepository;
let createTransfers: CreateTransfersService;
let fakeTransfersCreateUser: FakeTransfersRepository;

describe('CreateTransfers', () => {
  beforeEach(() => {
    faketransfersRepository = new FakeTransfersRepository();
    createTransfers = new CreateTransfersService(faketransfersRepository);
    fakeTransfersCreateUser = new FakeTransfersRepository();
  });

  it('should be able to create a transfers', async () => {
    const user = await fakeTransfersCreateUser.createUser({
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

    const transfers = await createTransfers.execute({
      amount: '323',
      accountType: 'CHECKING',
      bankNumber: '3223',
      agencyNumber: '234',
      agencyCheckNumber: 324,
      accountNumber: 3242,
      accountCheckNumber: 23,
      fullname: 'Dev Name',
      taxDocumentType: 'CPF',
      taxDocumentNumber: '222.222.222-09',
      userId: user.id,
      payeeId: 9,
      state: 'IN_ANALISYS',
      moipTransfersId: '98AS79asddfas90',
      method: 'BANK_ACCOUNT',
    });

    expect(transfers).toHaveProperty('id');
  });
});
