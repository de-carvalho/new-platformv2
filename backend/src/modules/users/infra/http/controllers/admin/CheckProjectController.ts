/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AdminCheckProjectService from '@modules/users/services/admin/CheckProjectService';
import GetProjectsToCheckService from '@modules/users/services/admin/GetProjectsToCheckService';
import InterestService from '@modules/calculations/services/InterestService';

export default class AdminCheckProjectController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getProjectsToCheckService = container.resolve(
      GetProjectsToCheckService,
    );

    const projects = await getProjectsToCheckService.execute();

    return response.json(classToClass(projects));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { projectId, entrepreneurId } = request.query;

    const { analysisResult, receiveDate, interestCollective } = request.body;
    const { loanMargin, totalInstallments, interestDebenture } = request.body;
    const { receiveDate2, gracePeriod } = request.body;

    const adminCheckProjectService = container.resolve(
      AdminCheckProjectService,
    );
    const calcsInterest = container.resolve(InterestService);

    const interestCollectiveResult = await calcsInterest.execute({
      interest: interestCollective,
      amount: loanMargin,
      times: totalInstallments,
    });

    const interestDebentureResult = await calcsInterest.execute({
      interest: interestDebenture,
      amount: loanMargin,
      times: totalInstallments,
    });

    const project = await adminCheckProjectService.execute(
      parseInt(`${entrepreneurId}`),
      parseInt(`${user_id}`),
      parseInt(`${projectId}`),
      loanMargin,
      receiveDate,
      gracePeriod,
      totalInstallments,
      analysisResult,
      interestCollectiveResult.installmentAmount,
      interestCollectiveResult.amountToPayBack,
      interestCollective,
      interestDebentureResult.installmentAmount,
      interestDebentureResult.amountToPayBack,
      interestDebenture,
      receiveDate2,
    );

    return response.json(project);
  }
}
