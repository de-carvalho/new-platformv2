import AppError from '@shared/errors/AppErrors';

import FakeUsersPJRepository from '../../repositories/fakes/FakeUserPJRepository';
import GetAllPartnersService from '../GetAllPartnersService';
import CreateUserPJService from '../CreateUserPJService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

describe('GetPartners', () => {
  it('should be able to return all partners', async () => {
    const fakeUsersPJRepository = new FakeUsersPJRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserPJ = new CreateUserPJService(
      fakeUsersPJRepository,
      fakeHashProvider,
    );
    const getPartners = new GetAllPartnersService(fakeUsersPJRepository);

    await createUserPJ.execute({
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
      addressZipcode: '05890-130',
      addressCity: 'São Paulo',
      addressState: 'SP',
      taxDocumentType: 'CNPJ',
      taxDocumentNumber: '46.256.982/0001-88',
      passwordHash: '123456',
      origens: 'Google',
      credit: 'Marketing',
      value: '4000',
      accountType: 'PJ',
      moipAccountId: 'asfa98fas',
      moipToken: 'asfas908uas',
      ownId: 'afas908f',
      moipCustomerId: 'asjfsaop',
      role: 'PARTNER',
      businessName: '',
      companyAddressCity: 'São Paulo',
      companyAddressComplement: 'Complemento',
      companyAddressDistrict: 'Jardim Iae',
      companyAddressNumber: '99',
      companyAddressState: 'SP',
      companyAddressStreet: 'Rua de endereço sp',
      companyAddressZipcode: '05890-130',
      companyName: 'Firgun',
      companyPhoneArea: '11',
      companyPhoneNumber: '99099999399',
      cpfResponsible: '239.000.000-09',
      emailResponsible: 'johndoe2@gmail.com',
      partnerId: 0,
    });

    const partners = await getPartners.execute();

    expect(partners).toHaveLength(1);
  });

  it('should return an empty array of partners', async () => {
    const fakeUsersPJRepository = new FakeUsersPJRepository();
    const getPartners = new GetAllPartnersService(fakeUsersPJRepository);

    expect(getPartners.execute()).rejects.toBeInstanceOf(AppError);
  });
});
