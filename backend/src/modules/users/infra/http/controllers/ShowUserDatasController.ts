/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetUserService from '@modules/users/services/GetUserService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const usersService = container.resolve(GetUserService);

    const user = await usersService.execute(parseInt(`${user_id}`));

    return response.json(classToClass(user));
  }
}
