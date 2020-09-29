/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

// Esta função cria a conta de um usuário na wirecard como pessoa jurídica.
export default async function createAccountWithCNPJ(
  user: any,
  comercialEmail: any,
): Promise<any> {
  try {
    const account = await moip.account.create({
      email: {
        address: comercialEmail,
      },
      person: {
        name: user.firstName,
        lastName: user.lastName,
        taxDocument: {
          type: 'CPF',
          number: user.cpfResponsible,
        },
        birthDate: user.dob,
        phone: {
          countryCode: '55',
          areaCode: user.cellphoneArea,
          number: user.cellphoneNumber,
        },
        address: {
          street: user.addressStreet,
          streetNumber: user.addressNumber,
          district: user.addressDistrict,
          zipCode: user.addressZipcode,
          complement: user.addressComplement,
          city: user.addressCity,
          state: user.addressState,
          country: 'BRA',
        },
      },
      company: {
        name: user.companyName,
        businessName: user.businessName,
        taxDocument: {
          type: 'CNPJ',
          number: user.taxDocumentNumber,
        },
        phone: {
          countryCode: '55',
          areaCode: user.companyPhoneArea,
          number: user.companyPhoneNumber,
        },
        address: {
          street: user.companyAddressStreet,
          streetNumber: user.companyAddressNumber,
          district: user.companyAddressDistrict,
          zipCode: user.companyAddressZipcode,
          city: user.companyAddressCity,
          state: user.companyAddressState,
          country: 'BRA',
        },
      },
      businessSegment: {
        id: 3,
      },
      type: 'MERCHANT',
      transparentAccount: true,
    });

    return { id: account.body.id, accessToken: account.body.accessToken };
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
