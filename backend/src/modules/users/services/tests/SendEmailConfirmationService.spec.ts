import AppError from '@shared/errors/AppErrors';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUserPFRepository';
import SendEmailConfirmationService from '../SendEmailConfirmationService';
import FakeUserTokenRepository from '../../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendEmailConfirmation: SendEmailConfirmationService;

describe('SendEmailConfirmationService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokenRepository();
    fakeMailProvider = new FakeMailProvider();

    sendEmailConfirmation = new SendEmailConfirmationService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send the email confirmation', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
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

    await sendEmailConfirmation.execute({
      email: 'johndoe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send the email confirmation to non existing user', async () => {
    expect(
      sendEmailConfirmation.execute({
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
