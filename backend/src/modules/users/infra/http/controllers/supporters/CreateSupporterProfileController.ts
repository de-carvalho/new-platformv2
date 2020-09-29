/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupporterProfileService from '@modules/users/services/supporters/CreateSupporterProfileService';

export default class UpdateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { alreadyInvests, wantToReceiveEmail, typesOfcauses } = request.body;
    const { wantToReceiveInformation, wantToReinvestBalance } = request.body;
    const { howMuchWantToInvest, howDoYouConsidereYourself } = request.body;

    const createSupporterProfileService = container.resolve(
      CreateSupporterProfileService,
    );

    const userProfile = await createSupporterProfileService.execute({
      alreadyInvests,
      howDoYouConsidereYourself,
      howMuchWantToInvest,
      typesOfcauses,
      wantToReceiveEmail,
      wantToReceiveInformation,
      wantToReinvestBalance,
      userId: parseInt(`${user_id}`),
    });

    return response.json(userProfile);
  }
}
