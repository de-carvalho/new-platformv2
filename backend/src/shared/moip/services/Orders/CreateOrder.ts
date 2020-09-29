/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import generateUniqueId from '@shared/utils/generateUniqueId';
import moip from '../../credentials';

// Esta função cria um pedido na wirecard.
export default async function createOrders(
  user: any,
  project: any,
  value: number,
): Promise<any> {
  try {
    const order = await moip.order.create({
      ownId: generateUniqueId(),
      amount: {
        currency: 'BRL',
      },
      items: [
        {
          product: project.name,
          quantity: 1,
          detail: project.description,
          price: value,
        },
      ],
      customer: {
        id: user.moipCustomerId,
      },
      receivers: [
        {
          type: 'PRIMARY',
          feePayor: false,
          moipAccount: {
            id: project.moipAccountId,
          },
          amount: {
            fixed: value,
          },
        },
      ],
    });

    return order.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
