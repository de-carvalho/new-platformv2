/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';

interface IDatas {
  amount: string;
  moipAccountId: string;
}
// Esta função cria uma transferência entre contas firgun.
export default async function createFirgunTransfers(
  userDatas: IDatas,
  accessToken: string,
): Promise<any> {
  // eslint-disable-next-line global-require
  const moip = require('moip-sdk-node').default({
    accessToken: `${accessToken}`, // acess token do projeto ou investidor
    // token: 'QLIO5IMP4UL0OQJCTHXRLS5INIHRXGEV',
    // key: 'BCIOVUVMUS7LNTS0C75C5BN9GCMUTIR5WFUBUZR9',
    production: false,
  });

  try {
    const transfers = await moip.transfer.create({
      amount: parseInt(userDatas.amount),
      transferInstrument: {
        method: 'MOIP_ACCOUNT',
        moipAccount: {
          id: userDatas.moipAccountId, // destinatário
        },
      },
    });

    return transfers.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
