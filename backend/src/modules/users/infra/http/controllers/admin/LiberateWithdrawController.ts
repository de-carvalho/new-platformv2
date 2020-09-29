import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import LiberateWithdrawService from '@modules/users/services/admin/LiberateWithdrawService';
import GetAndCheckUserService from '@modules/users/services/CheckUserService';
import moipServices from '@shared/moip/services';
import Project from '@modules/projects/infra/typeorm/entities/Project';

export default class LiberateWithdrawController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const liberateWithdraw = container.resolve(LiberateWithdrawService);
    const checkUser = container.resolve(GetAndCheckUserService);
    const projectsRepository = getRepository(Project);

    await liberateWithdraw.execute({
      userId: Number(user_id),
      projectId: Number(project_id),
    });

    const project = await projectsRepository.findOne({
      where: { id: project_id },
    });

    const partner = await checkUser.execute(Number(project?.partnerId));

    const firgunData = {
      amount: String(project?.firgunAmountTotal).replace('.', ''), // valor da Firgun
      moipAccountId: 'MPA-REWROUSFUS908S', // Id da conta da firgun na moip
    };

    const partnerData = {
      amount: String(project?.totalPartnerAmount).replace('.', ''), // valor do parceiro
      moipAccountId: String(partner?.moipAccountId), // Id da conta do parceiro na moip
    };

    // Faz a transferência dos valores da Firgun (8%) e do parceiro (0.5%)
    await Promise.all([
      moipServices.FirgunTransfersCreate(
        firgunData,
        String(project?.moipToken),
      ),
      moipServices.FirgunTransfersCreate(
        partnerData,
        String(project?.moipToken),
      ),
    ]);

    return response.json({ message: 'Saque liberado com sucesso' });
  }
}
