/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

// Esta função cria um multipedido na wirecard.
export default async function getMultiOrders(
  multiOrderId: string,
): Promise<any> {
  try {
    const orders = await moip.multiorder.getOne(multiOrderId);

    return orders.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
