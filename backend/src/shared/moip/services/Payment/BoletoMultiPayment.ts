/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

interface IUserData {
  boletoExpirationDate: string;
  instalment?: number;
}

export default async function boletoMultiPayment(
  orderId: string,
  { boletoExpirationDate, instalment }: IUserData,
): Promise<any> {
  try {
    let count: number;

    if (instalment) {
      count = instalment;
    }
    count = 1;

    const payment = await moip.multipayment.create(orderId, {
      installmentCount: count,
      fundingInstrument: {
        method: 'BOLETO',
        boleto: {
          expirationDate: boletoExpirationDate,
          instructionLines: {
            first: 'Pagamento projeto firgun',
            second: 'Segunda linha do boleto',
            third: 'Terceira linha do boleto',
          },
          logoUri: 'https://sualoja.com.br/logo.jpg',
        },
      },
    });

    return {
      id: payment.body.id,

      link: payment.body._links.checkout.payBoleto.printHref,
      status: payment.body.status,
      lineCode: payment.body.fundingInstrument.boleto.lineCode,
    };
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
