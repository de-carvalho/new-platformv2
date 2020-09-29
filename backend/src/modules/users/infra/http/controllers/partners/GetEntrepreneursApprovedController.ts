/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetEntrepreneursApprovedService from '@modules/users/services/partners/GetEntrepreneursService';

export default class GetEntrepreneursController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const entrepreneursApproved = container.resolve(
      GetEntrepreneursApprovedService,
    );

    const entrepreneurs = await entrepreneursApproved.execute(
      parseInt(`${user_id}`),
    );

    return response.json(classToClass(entrepreneurs));
  }
}
