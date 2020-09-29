/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AdminFirgunTeamService from '@modules/users/services/admin/FirgunTeamService';
import GetFirgunTeamService from '@modules/users/services/admin/GetFirgunTeamService';
import UpdateFirgunTeamService from '@modules/users/services/admin/UpdateTeamMemberService';
import DeleteFirgunTeamMemberService from '@modules/users/services/admin/DeleteFirgunTeamMemberService';

export default class AdminFirgunTeamController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getFirgunTeamService = container.resolve(GetFirgunTeamService);

    const team = await getFirgunTeamService.execute();

    return response.json(classToClass(team));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { firstName, lastName, email, linkedin } = request.body;
    const { cellPhoneNumber, cpfNumber, occupation, avatar } = request.body;

    const adminFirgunTeamService = container.resolve(AdminFirgunTeamService);

    const team = await adminFirgunTeamService.execute({
      firstName,
      lastName,
      email,
      cellPhoneNumber,
      cpfNumber,
      occupation,
      linkedin,
      avatar,
      userId: parseInt(`${user_id}`),
    });

    return response.json(team);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { firstName, lastName, email, linkedin, memberId } = request.body;
    const { cellPhoneNumber, cpfNumber, occupation } = request.body;

    const updateFirgunTeamService = container.resolve(UpdateFirgunTeamService);

    const team = await updateFirgunTeamService.execute({
      firstName,
      lastName,
      email,
      cellPhoneNumber,
      cpfNumber,
      occupation,
      linkedin,
      userId: parseInt(`${user_id}`),
      memberId,
    });

    return response.json(team);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { memberId } = request.body;

    const deleteTeamMember = container.resolve(DeleteFirgunTeamMemberService);

    await deleteTeamMember.execute({
      memberId,
      userId: parseInt(`${user_id}`),
    });

    return response.status(204).json();
  }
}
