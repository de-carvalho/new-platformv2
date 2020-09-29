/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

// Esta função consulta todas/os webhooks/noticações
export default async function getAllWebhooks(): Promise<any> {
  try {
    const webhooks = await moip.webhook.getAll();

    return webhooks.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
