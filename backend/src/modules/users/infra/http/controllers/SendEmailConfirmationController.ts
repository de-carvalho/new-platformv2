import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailConfirmationService from '@modules/users/services/SendEmailConfirmationService';

export default class SendEmailConfirmationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailConfirmation = container.resolve(
      SendEmailConfirmationService,
    );

    await sendEmailConfirmation.execute({ email });

    return response.status(204).json();
  }
}
