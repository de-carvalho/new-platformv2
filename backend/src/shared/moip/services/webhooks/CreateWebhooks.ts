/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

// Esta função cria um webhook/noticação

export default async function createWebhooks(url: string): Promise<any> {
  try {
    const notification = await moip.notification.create({
      events: ['ORDER.*', 'PAYMENT.*'],
      target: url,
      media: 'WEBHOOK',
    });

    return notification.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
