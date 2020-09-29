/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetUserService from '@modules/users/services/GetUserService';
import GetUserProjectsInProgressService from '@modules/projects/services/GetUserProjectInProgressService';

export default class EntrepreneurContractController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const projectInProgress = container.resolve(
      GetUserProjectsInProgressService,
    );
    const usersService = container.resolve(GetUserService);

    const user = await usersService.execute(parseInt(`${user_id}`));

    const project = await projectInProgress.execute(parseInt(`${user_id}`));

    const entrepreneurContract = {
      user: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        taxDocumentNumber: user?.taxDocumentNumber,
        gender: user?.gender,
        addressStreet: user?.addressStreet,
        addressZipcode: user?.addressZipcode,
        addressState: user?.addressState,
        addressNumber: user?.addressNumber,
        addressCity: user?.addressCity,
        addressComplement: user?.addressComplement,
        dob: user?.dob,
        cellphoneArea: user?.cellphoneArea,
        cellphoneNumber: user?.cellphoneNumber,
        race: user?.race,
        profession: user?.profession,
        bankNumber: user?.bankNumber,
        bankAgencyNumber: user?.bankAgencyNumber,
        bankAccountType: user?.bankAccountType,
        bankAccountNumber: user?.bankAccountNumber,
      },
      project: {
        id: project?.id,
        name: project?.name,
        description: project?.description,
        businesstime: project?.businessTime,
        documentResponsible: user?.taxDocumentNumber,
      },
    };

    return response.json(entrepreneurContract);
  }
}
