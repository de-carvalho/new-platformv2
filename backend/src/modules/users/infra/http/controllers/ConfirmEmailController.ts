import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ConfirmEmailService from '@modules/users/services/ConfirmEmailService';

export default class EmailConfirmationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const emailConfirmation = container.resolve(ConfirmEmailService);

    await emailConfirmation.execute({ token });

    return response.json({ message: 'Email confirmado com sucesso' });
  }
}
