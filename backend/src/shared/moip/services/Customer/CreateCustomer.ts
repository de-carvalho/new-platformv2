/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import generateUniqueId from '@shared/utils/generateUniqueId';
import moip from '../../credentials';

// Esta função cria um cliente na wirecard.
export default async function createCustomer(
  user: any,
  comercialEmail: any,
): Promise<any> {
  const ownId = generateUniqueId();

  const fullname = `${user.firstName} ${user.lastName}`;

  try {
    const customer = await moip.customer.create({
      ownId,
      fullname,
      email: comercialEmail,
      birthDate: user.dob,
      taxDocument: {
        type: user.taxDocumentType,
        number: user.taxDocumentNumber,
      },
      phone: {
        countryCode: '55',
        areaCode: user.cellphoneArea,
        number: user.cellphoneNumber,
      },
      shippingAddress: {
        city: user.addressCity,
        complement: user.addressComplement,
        district: user.addressDistrict,
        street: user.addressStreet,
        streetNumber: user.addressNumber,
        zipCode: user.addressZipcode,
        state: user.addressState,
        country: 'BRA',
      },
    });

    return { id: customer.body.id, ownId: customer.body.ownId };
  } catch (error) {
    console.log(error.message);

    throw new AppError(`(Moip error) ${error.message}`);
  }
}
