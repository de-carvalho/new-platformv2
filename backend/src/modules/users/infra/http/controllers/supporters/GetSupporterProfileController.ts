/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetSupporterProfileService from '@modules/users/services/supporters/GetSupporterProfileService';

export default class UpdateUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getSupporterProfileService = container.resolve(
      GetSupporterProfileService,
    );

    const supporterData = await getSupporterProfileService.execute(
      parseInt(`${user_id}`),
    );

    return response.json(supporterData);
  }
}
