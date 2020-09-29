/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';

// Esta função faz a consulta do saldo de uma conta na wirecard
export default async function getAccountBalance(
  accessToken: string,
): Promise<any> {
  // eslint-disable-next-line global-require
  const moip = require('moip-sdk-node').default({
    accessToken: `${accessToken}`,
    // token: 'QLIO5IMP4UL0OQJCTHXRLS5INIHRXGEV',
    // key: 'BCIOVUVMUS7LNTS0C75C5BN9GCMUTIR5WFUBUZR9',
    production: false,
  });

  try {
    const balance = await moip.balance.getOne();

    return {
      current: balance.body[0].current,
      future: balance.body[0].future,
      unavailable: balance.body[0].unavailable,
      date: balance.body[0].date,
    };
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
