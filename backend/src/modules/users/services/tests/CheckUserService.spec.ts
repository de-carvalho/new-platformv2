import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../../repositories/fakes/FakeUserPFRepository';
import CheckUser from '../CheckUserService';
import CreateUserService from '../CreateUserPFService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

describe('CheckUserService', () => {
  it('should be able to check a user existence', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const checkUser = new CheckUser(fakeUsersRepository);
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(checkUser.execute(55)).rejects.toBeInstanceOf(AppError);

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

    const userChecked = await checkUser.execute(user.id);

    expect(userChecked).toHaveProperty('id');
  });
});
