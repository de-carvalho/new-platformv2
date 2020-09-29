/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

// Esta função consulta todas/os webhooks/noticações
export default async function getWebhook(webhookId: string): Promise<any> {
  try {
    const webhook = await moip.webhook.getOne(webhookId);

    return webhook.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
