/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RequestContractService from '@modules/users/services/entrepreneurs/RequestContractService';
import GetUserProjectsInProgressService from '@modules/projects/services/GetUserProjectInProgressService';
import GetEntrepreneurDocuments from '@modules/users/services/entrepreneurs/GetEntrepreneurDocumentsService';

export default class RequestContractController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const requestContract = container.resolve(RequestContractService);
    const entrepreneurDocuments = container.resolve(GetEntrepreneurDocuments);
    const projectInProgress = container.resolve(
      GetUserProjectsInProgressService,
    );

    const project = await projectInProgress.execute(parseInt(`${user_id}`));

    const entrepreneurDocs = await entrepreneurDocuments.execute(
      parseInt(`${user_id}`),
    );

    await requestContract.execute({
      entrepreneurId: parseInt(`${user_id}`),
      projectId: parseInt(`${project_id}`),
      amountWanted: `${project?.goal}`,
      receiveDate: project?.dateLimit,
      totalInstallments: parseInt(`${project?.installmentsPrediction}`),
      entrepreneurDocsId: entrepreneurDocs.id,
    });

    return response.json({ message: 'Contrato solicitado com sucesso' });
  }
}
