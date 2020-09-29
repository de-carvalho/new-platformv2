/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateSupporterProfileService from '@modules/users/services/supporters/UpdateSupporterProfileService';

export default class UpdateUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { alreadyInvests, wantToReceiveEmail, typesOfcauses } = request.body;
    const { wantToReceiveInformation, wantToReinvestBalance } = request.body;
    const { howMuchWantToInvest, howDoYouConsidereYourself } = request.body;

    const updateSupporterProfileService = container.resolve(
      UpdateSupporterProfileService,
    );

    const userUpdatedProfile = await updateSupporterProfileService.execute({
      alreadyInvests,
      howDoYouConsidereYourself,
      howMuchWantToInvest,
      typesOfcauses,
      wantToReceiveEmail,
      wantToReceiveInformation,
      wantToReinvestBalance,
      userId: parseInt(`${user_id}`),
    });

    return response.json(userUpdatedProfile);
  }
}
