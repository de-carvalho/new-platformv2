/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import generateUniqueId from '@shared/utils/generateUniqueId';
import moip from '../../credentials';

// Esta função cria um multipedido na wirecard.
export default async function createMultiOrders(
  project: any,
  orders: object[],
  value: number,
): Promise<any> {
  try {
    const order = await moip.multiorder.create({
      ownId: generateUniqueId(),
      orders: [
        {
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
            id: 'CUS-YQ7FMQILZCL8',
          },
          receivers: orders,
        },
      ],
    });

    return order.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
