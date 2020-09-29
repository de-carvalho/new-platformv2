/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppErrors';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';
import Payment from '../infra/typeorm/entities/Payment';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  amount: string;
  projectId: number;
  payeeId: number;
  payorId: number;
  state: string;
  purpose: string;
  moipId: string;
  boletoLink: string;
}

@injectable()
class CreatePaymentService {
  constructor(
    @inject('PaymentRepository')
    private paymentsRepository: IPaymentsRepository,

    @inject('InterestRepository')
    private interest: InterestRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('AdminCheckProjects')
    private adminCheckProjects: IAdminCheckProjectsRepository,
  ) {}

  public async execute({
    amount,
    purpose,
    moipId,
    boletoLink,
    payeeId,
    projectId,
    state,
    payorId,
  }: IRequest): Promise<Payment> {
    const findProject = await this.paymentsRepository.findProject(projectId);

    if (!findProject) {
      throw new AppError('O projeto não foi encontrado');
    }

    const payment = await this.paymentsRepository.create({
      amount,
      purpose,
      moipId,
      boletoLink,
      payeeId,
      projectId,
      state,
      payorId,
    });

    // Incrementa o valor arrecadado com valor investido no projeto
    findProject.raised = `${Number(findProject.raised) + Number(amount)}`;

    const firgunAmount = await this.interest.firgunAmount(findProject.raised);
    const partnerAmount = await this.interest.partnerAmount(findProject.raised);

    findProject.firgunAmountTotal = firgunAmount.toFixed(2);
    findProject.totalPartnerAmount = partnerAmount.toFixed(2);

    const findProjectChecked = await this.adminCheckProjects.findProjectByType(
      findProject.entrepreneurId,
      projectId,
      findProject.projectType,
    );

    // Verifica se o valor a ser investido é igual ao valor que resta para
    // completar o projeto, caso seja, atualiza o estado do projeto
    if (
      parseFloat(`${findProject.goal}`) === parseFloat(`${findProject.raised}`)
    ) {
      findProject.state = 'COMPLETED';

      if (findProjectChecked) {
        findProjectChecked.projectState = 'COMPLETED';
      }

      const findEntrepreneur = await this.paymentsRepository.findUser(
        findProject.entrepreneurId,
      );

      if (findEntrepreneur) {
        const projectCompletedTemplate = path.resolve(
          __dirname,
          '..',
          'views',
          'projectCompleted.hbs',
        );

        await this.mailProvider.sendMail({
          to: {
            name: findEntrepreneur.firstName,
            email: findEntrepreneur.email,
          },
          subject: '[Firgun] Projeto completo',
          templateData: {
            file: projectCompletedTemplate,
            variables: {
              name: findEntrepreneur.firstName,
              project: findProject.name,
              amount: findProject.raised,
            },
          },
        });
      }
    }

    await this.paymentsRepository.updateProject(findProject);

    return payment;
  }
}

export default CreatePaymentService;
