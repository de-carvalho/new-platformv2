/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetAllPartnersService from '@modules/users/services/GetAllPartnersService';

export default class UpdateUserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getAllPartnersService = container.resolve(GetAllPartnersService);

    const partners = await getAllPartnersService.execute();

    return response.json(classToClass(partners));
  }
}
