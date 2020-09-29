import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../../repositories/fakes/FakeUserPFRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserPFService';
import CheckUserByEmailAndDocsService from '../CheckUserByEmailAndDocsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let checkUserByEmailAndDocs: CheckUserByEmailAndDocsService;

describe('CheckUserByEmailAndDocsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    checkUserByEmailAndDocs = new CheckUserByEmailAndDocsService(
      fakeUsersRepository,
    );
  });

  it('should be able to check the partner and user documents', async () => {
    expect(
      checkUserByEmailAndDocs.execute(
        'teste@gmail.com',
        '222.222.222-04',
        'ENTREPRENEUR',
        2,
      ),
    ).rejects.toBeInstanceOf(AppError);

    const user = await createUser.execute({
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
      role: ' SUPPORTER',
    });

    expect(
      checkUserByEmailAndDocs.execute(
        user.email,
        user.taxDocumentNumber,
        user.role,
        user.partnerId,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check the user by specific email', async () => {
    const user = await createUser.execute({
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
      role: ' SUPPORTER',
    });

    expect(
      checkUserByEmailAndDocs.execute(
        user.email,
        '222.222.222-04',
        user.role,
        user.partnerId,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check the user by specific taxDocument', async () => {
    const user = await createUser.execute({
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
      role: ' SUPPORTER',
    });

    expect(
      checkUserByEmailAndDocs.execute(
        'teste@gmail.com',
        user.taxDocumentNumber,
        user.role,
        user.partnerId,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return the user', async () => {
    const user = await createUser.execute({
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
      accountType: 'PJ',
      partnerId: 1,
      moipAccountId: 'asfa98fas',
      moipToken: 'asfas908uas',
      ownId: 'afas908f',
      moipCustomerId: 'asjfsaop',
      role: ' SUPPORTER',
    });

    const userChecked = await checkUserByEmailAndDocs.execute(
      user.email,
      '222.222.222-04',
      user.role,
      user.partnerId,
    );

    expect(userChecked).toHaveProperty('id');
  });
});
