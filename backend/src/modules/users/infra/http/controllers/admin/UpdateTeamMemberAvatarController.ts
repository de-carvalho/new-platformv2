/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateTeamMemberAvatarService from '@modules/users/services/admin/UpdateTeamMemberAvatarService';

export default class TeamMemberAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const updateTeamMemberAvatar = container.resolve(
      UpdateTeamMemberAvatarService,
    );

    const teamMember = await updateTeamMemberAvatar.execute({
      avatar: request.file.filename,
      userId: parseInt(`${user_id}`),
    });

    return response.json(teamMember);
  }
}
