import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../../repositories/fakes/FakeUserPFRepository';
import ConfirmEmailService from '../ConfirmEmailService';
import CreateUserService from '../CreateUserPFService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokenRepository from '../../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let confirmEmail: ConfirmEmailService;
let createUser: CreateUserService;

describe('ConfirmEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    confirmEmail = new ConfirmEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to confirm the email', async () => {
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
      role: ' ENTREPRENEUR',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await confirmEmail.execute({ token });

    expect(user.emailConfirmed).toBe(true);
  });

  it('should not be able to confirm an email that has already been confirmed', async () => {
    await expect(
      confirmEmail.execute({ token: 'fdfasfsafafas' }),
    ).rejects.toBeInstanceOf(AppError);

    const { token } = await fakeUserTokensRepository.generate(33);

    await expect(confirmEmail.execute({ token })).rejects.toBeInstanceOf(
      AppError,
    );

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
      role: ' ENTREPRENEUR',
    });

    user.emailConfirmed = true;

    const tokenRes = await fakeUserTokensRepository.generate(user.id);

    await expect(
      confirmEmail.execute({ token: tokenRes.token }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to confirm the email if passed more than 1 hour', async () => {
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
      role: ' ENTREPRENEUR',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(confirmEmail.execute({ token })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
