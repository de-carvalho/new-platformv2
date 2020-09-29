/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';
/*
 * Esta função atualiza os dados do cliente na wirecard.
 * ===Atualiazação dos dados do cliente===.
 * OBS: a atualização somente é feita por meio da criação de um order,
 * "regra da moip".
 */

export default async function updateCustomer(
  data: any,
  user: any,
): Promise<any> {
  //= ==Esta variável recebe a junção do nome e sobrenome do usuário===
  const fullname = `${data.firstName} ${data.lastName}`;

  try {
    const customer = await moip.order.create({
      ownId: user.ownId,
      amount: {
        currency: 'BRL',
        subtotals: {
          shipping: 100,
        },
      },
      items: [
        {
          product: 'Descrição do pedido',
          quantity: 1,
          detail: 'Mais info...',
          price: 100,
        },
      ],
      customer: {
        ownId: user.ownId,
        fullname,
        email: data.email,
        birthDate: user.dob,
        taxDocument: {
          type: user.taxDocumentType,
          number: user.taxDocumentNumber,
        },
        phone: {
          countryCode: '55',
          areaCode: data.cellphoneArea,
          number: data.cellphoneNumber,
        },
        shippingAddress: {
          city: data.addressCity,
          complement: data.addressComplement,
          district: data.addressDistrict,
          street: data.addressStreet,
          streetNumber: data.addressNumber,
          zipCode: data.addressZipcode,
          state: data.addressState,
          country: 'BRA',
        },
      },
    });

    return customer.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
