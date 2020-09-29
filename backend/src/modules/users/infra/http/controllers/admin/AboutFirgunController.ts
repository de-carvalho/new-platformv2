/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAboutFirgunService from '@modules/users/services/admin/AboutFirgunService';
import GeAboutFirgunService from '@modules/users/services/admin/GetAboutFirgunDataService';
import UpdateAboutFirgunService from '@modules/users/services/admin/UpdateAboutFirgunService';

export default class AdminFirgunTeamController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getAboutFirgunService = container.resolve(GeAboutFirgunService);

    const about = await getAboutFirgunService.execute();

    return response.json(about);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { about, awards, press } = request.body;

    const aboutFirgunService = container.resolve(CreateAboutFirgunService);

    const aboutFirgun = await aboutFirgunService.execute({
      about,
      awards,
      press,
      userId: parseInt(`${user_id}`),
    });

    return response.json(aboutFirgun);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { about, awards, press } = request.body;

    const updateAboutFirgun = container.resolve(UpdateAboutFirgunService);

    const aboutFirgun = await updateAboutFirgun.execute({
      about,
      awards,
      press,
      userId: parseInt(`${user_id}`),
    });

    return response.json(aboutFirgun);
  }
}
