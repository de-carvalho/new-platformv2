/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';

// Esta função cria uma transferência entre contas bancárias.
export default async function createTransfers(
  userDatas: any,
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
    const transfers = await moip.transfer.create({
      amount: userDatas.amount,
      transferInstrument: {
        method: 'BANK_ACCOUNT',
        bankAccount: {
          type: userDatas.bankAccountType,
          bankNumber: userDatas.bankNumber,
          agencyNumber: userDatas.agencyNumber,
          agencyCheckNumber: userDatas.agencyCheckNumber,
          accountNumber: userDatas.accountNumber,
          accountCheckNumber: userDatas.accountCheckNumber,
          holder: {
            fullname: userDatas.fullname,
            taxDocument: {
              type: userDatas.taxDocumentType,
              number: userDatas.taxDocumentNumber,
            },
          },
        },
      },
    });

    return transfers.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
