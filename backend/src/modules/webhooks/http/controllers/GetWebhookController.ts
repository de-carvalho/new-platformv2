/* eslint-disable radix */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import moipServices from '@shared/moip/services';
import AppError from '@shared/errors/AppErrors';
import User from '@modules/users/infra/typeorm/entities/User';

export default class GetWebhookController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;
    const { webhookId } = request.body;

    const usersRepository = getRepository(User);

    const findLoggedUser = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!findLoggedUser || findLoggedUser?.role !== 'ADMIN') {
      throw new AppError(
        'Você não está habilitado para completar essa operação',
      );
    }

    const webhook = await moipServices.GeWebhook(webhookId);

    return response.json(webhook);
  }
}
