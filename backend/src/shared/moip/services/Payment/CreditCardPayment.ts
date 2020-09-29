/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

// Esta função cria o pagemento por cartão de crédito.
export default async function creditCardPayment(
  orderId: string,
  holder: any,
): Promise<any> {
  try {
    const payment = await moip.payment.create(orderId, {
      installmentCount: 1,
      fundingInstrument: {
        method: 'CREDIT_CARD',
        creditCard: {
          number: holder.creditCardNumber,
          expirationMonth: holder.creditCardExpirationMonth,
          expirationYear: holder.creditCardExpirationYear,
          cvc: holder.creditCardCvc,
          store: true,
          holder: {
            fullname: holder.name,
            birthdate: holder.birthdate,
            taxDocument: {
              type: holder.taxDocumentType,
              number: holder.taxDocumentNumber,
            },
          },
        },
      },
    });

    return { id: payment.body.id, status: payment.body.status };
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
