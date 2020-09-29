/* eslint-disable @typescript-eslint/no-explicit-any */
import moip from '../../credentials';
/*
 * Esta função faz a consulta dos dados do cliente na wirecard
 * ===Listagem dos dados do cliente===.
 */
export default async function getCustomer(customerId: string): Promise<any> {
  return moip.customer.getOne(customerId);
}
