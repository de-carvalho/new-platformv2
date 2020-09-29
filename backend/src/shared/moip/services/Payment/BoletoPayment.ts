/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, addHours } from 'date-fns';
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

// Esta função cria o pagemento por boleto.
export default async function boletoPayment(orderId: string): Promise<any> {
  try {
    const dateLimit = addHours(Date.now(), 24);

    const date = format(dateLimit, 'yyyy-MM-dd');

    const payment = await moip.payment.create(orderId, {
      installmentCount: 1,
      fundingInstrument: {
        method: 'BOLETO',
        boleto: {
          expirationDate: date,
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
      // eslint-disable-next-line no-underscore-dangle
      link: payment.body._links.payBoleto.printHref,
      status: payment.body.status,
      lineCode: payment.body.fundingInstrument.boleto.lineCode,
    };
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
