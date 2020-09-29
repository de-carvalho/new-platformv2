/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetEntrepreneursToApproveService from '@modules/users/services/partners/GetEntrepreneursToApproveService';
import ApproveEntrepreneursService from '@modules/users/services/partners/ApproveEntrepreneurService';

export default class EntrepreneursController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const entrepreneurToApprove = container.resolve(
      GetEntrepreneursToApproveService,
    );

    const entrepreneurs = await entrepreneurToApprove.execute(
      parseInt(`${user_id}`),
    );

    return response.json(classToClass(entrepreneurs));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;
    const { entrepreneur_id } = request.query;

    const { confirmationStatus } = request.body;

    const approveEntrepreneur = container.resolve(ApproveEntrepreneursService);

    await approveEntrepreneur.execute(
      parseInt(`${user_id}`),
      parseInt(`${entrepreneur_id}`),
      confirmationStatus,
    );

    let message = 'Empreendedor aprovado!';

    if (confirmationStatus === false) {
      message = 'Empreendedor reprovado!';
    }

    return response.json({ message });
  }
}
