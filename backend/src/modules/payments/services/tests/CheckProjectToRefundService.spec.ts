import AppError from '@shared/errors/AppErrors';

import FakePaymentRepository from '../../repositories/fakes/FakeRefundPaymentRepository';
import CheckProjectToRefundService from '../CheckProjectToRefundService';
import FakeCreatePaymentService from '../fakes/FakeRefundPaymentService';

let fakepaymentRepository: FakePaymentRepository;
let fakecreatePayment: FakeCreatePaymentService;
let checkProjectService: CheckProjectToRefundService;

describe('CheckProjectToRefundService', () => {
  beforeEach(() => {
    fakepaymentRepository = new FakePaymentRepository();
    fakecreatePayment = new FakeCreatePaymentService(fakepaymentRepository);
    checkProjectService = new CheckProjectToRefundService(
      fakepaymentRepository,
    );
  });

  it('should be able to check the project', async () => {
    await expect(
      checkProjectService.execute('4', 4, 87, 6, false),
    ).rejects.toBeInstanceOf(AppError);

    const project = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.projectType = 1;

    await expect(
      checkProjectService.execute('4', project.id, 87, 5, false),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check the project state', async () => {
    const project = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.state = 'CANCELED';

    await expect(
      checkProjectService.execute('4', project.id, 3, 3, false),
    ).rejects.toBeInstanceOf(AppError);

    const project2 = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    await expect(
      checkProjectService.execute('4', project2.id, 3, 3, false),
    ).rejects.toBeInstanceOf(AppError);

    const project3 = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project3.state = 'COMPLETED';
    project3.paymentState = 'REFUNDED';
    project3.paidback = '6000';

    await expect(
      checkProjectService.execute('4', project3.id, 3, 3, false),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check the project amount captured', async () => {
    const project = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.state = 'COMPLETED';

    await expect(
      checkProjectService.execute('4', project.id, 3, 3, false),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check the amount to refund', async () => {
    const project = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.state = 'COMPLETED';
    project.paidback = '5500';
    project.raised = '2000';

    await expect(
      checkProjectService.execute('700', project.id, 3, 3, false),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check the installment to pay', async () => {
    const project = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.state = 'COMPLETED';
    project.paidback = '1000';
    project.raised = '2000';

    await fakecreatePayment.createBankStatement({
      amount: '500',
      dueDate: new Date(),
      installment: 3,
      projectId: project.id,
      projectName: project.name,
      state: 'Quitada',
      status: 'A pagar',
      userId: 3,
    });

    await expect(
      checkProjectService.execute('1000', project.id, 3, 3, false),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to check the previous installment until to pay the current one', async () => {
    const project = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.state = 'COMPLETED';
    project.paidback = '2000';
    project.raised = '2000';

    await fakecreatePayment.createBankStatement({
      amount: '500',
      dueDate: new Date(),
      installment: 2,
      projectId: project.id,
      projectName: project.name,
      state: 'A pagar',
      status: 'Em dia',
      userId: 3,
    });

    await fakecreatePayment.createBankStatement({
      amount: '500',
      dueDate: new Date(),
      installment: 3,
      projectId: project.id,
      projectName: project.name,
      state: 'A pagar',
      status: 'Em dia',
      userId: 3,
    });

    await expect(
      checkProjectService.execute('1000', project.id, 3, 3, false),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return the project', async () => {
    const project = await fakecreatePayment.createProject({
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      dateLimit: new Date(),
      description: 'Descrição do projeto',
      goal: '3000',
      location: 'São Paulo',
      pageContent: 'Conteúdo do projeto',
      videoUrl: 'www.youtube.com/video-do-projeto',
      entrepreneurId: 3,
      installmentsPrediction: 12,
      moipAccountId: 'M-a432j234b',
      moipToken: 'M-asfasf3434nk32jk3kn32_v2',
      paidback: '0',
      partnerId: 2,
      paymentState: 'NOT_REFUNDED',
      percentageFee: '2',
      raised: '0',
      state: 'CATCHING',
      totalToPayback: '6000',
      withdrawn: '1',
      firgunAnalisys: false,
      businessTime: '2 Anos',
    });

    project.state = 'COMPLETED';
    project.paidback = '2000';
    project.raised = '2000';

    await fakecreatePayment.createBankStatement({
      amount: '500',
      dueDate: new Date(),
      installment: 3,
      projectId: project.id,
      projectName: project.name,
      state: 'A pagar',
      status: 'Em dia',
      userId: 3,
    });

    expect(
      await checkProjectService.execute('500', project.id, 3, 3, false),
    ).toHaveProperty('id');
  });
});
