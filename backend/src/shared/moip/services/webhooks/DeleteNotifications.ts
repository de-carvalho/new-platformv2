/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppErrors';
import moip from '../../credentials';

export default async function deleteWebhookNotification(
  notificationId: string,
): Promise<any> {
  try {
    const webhooks = await moip.notification.remove(notificationId);

    return webhooks.body;
  } catch (error) {
    console.log(error.error.errors[0].description);

    throw new AppError(`(Moip error) ${error.error.errors[0].description}`);
  }
}
