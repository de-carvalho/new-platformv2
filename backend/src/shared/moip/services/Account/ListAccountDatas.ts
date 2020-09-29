import moip from '../../credentials';

/*
 * Esta função faz a consulta dos dados de uma conta da wirecard
 * de um determinado usuário.
 * ===Listagem dos dados da conta do usuário===.
 */
export default async function getAccount(accountId: string): Promise<void> {
  try {
    const userAccount = await moip.account.getOne(accountId);

    return userAccount.body;
  } catch (err) {
    throw new Error(err);
  }
}
