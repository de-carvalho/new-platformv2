/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import moipServices from '@shared/moip/services';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import CheckProjectService from '@modules/projects/services/CheckProjectsService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { user_account_type } = request.query;

    const { name, description, goal, pageContent, dateLimit } = request.body;
    const { videoUrl, category, location, businessTime } = request.body;

    const createProject = container.resolve(CreateProjectService);
    const checkProject = container.resolve(CheckProjectService);
    const usersRepository = getRepository(User);

    // Busca no banco de dados o usuário logado para criação do projeto
    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    // Faz a verificação de projeto em andamento
    await checkProject.execute(parseInt(`${user_id}`));

    // Processo de criação da conta o projeto na moip em função do tipo de conta
    // do usuário logado
    let projectAccount = null;

    if (user_account_type === 'PF') {
      projectAccount = await moipServices.AccountCPF(user);
    } else {
      projectAccount = await moipServices.AccountCNPJ(user, user?.email);
    }

    // Cadastra os dados do projeto no banco de dados, inicialmente com estado
    // CATCHING e o estado de pagamento NOT_REFUNDED
    const project = await createProject.execute({
      name,
      category,
      dateLimit,
      description,
      goal,
      entrepreneurId: parseInt(`${user_id}`),
      location,
      moipAccountId: projectAccount.id,
      moipToken: projectAccount.accessToken,
      pageContent,
      partnerId: parseInt(`${user?.partnerId}`),
      videoUrl,
      businessTime,
    });

    return response.json(classToClass(project));
  }
}
