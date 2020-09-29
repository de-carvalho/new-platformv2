import AppError from '@shared/errors/AppErrors';

import FakeRefundPaymentRepository from '../../repositories/fakes/FakeRefundPaymentRepository';
import CreateRefundPaymentService from '../RefundPaymentService';
import FakeCreateRefundPaymentService from '../fakes/FakeRefundPaymentService';

let fakepaymentRepository: FakeRefundPaymentRepository;
let fakecreatePayment: FakeCreateRefundPaymentService;
let createPayment: CreateRefundPaymentService;

describe('CreateRefundPaymentService', () => {
  beforeEach(() => {
    fakepaymentRepository = new FakeRefundPaymentRepository();
    fakecreatePayment = new FakeCreateRefundPaymentService(
      fakepaymentRepository,
    );
    createPayment = new CreateRefundPaymentService(fakepaymentRepository);
  });

  it('should be able to create a payment refund', async () => {
    expect(
      createPayment.execute({
        amount: '223',
        reimburserId: 4,
        moipId: 'a987fsfau',
        boletoLink: 'www.svfasfa.com/sf',
        totalPayees: 5,
        projectId: 9,
        state: 'WAITING',
        installments: 3,
        purpose: 'PROJECT_INVESTIMENT',
        moipOrderId: '097adgu9',
      }),
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

    const payment = await createPayment.execute({
      amount: '223',
      reimburserId: 4,
      moipId: 'a987fsfau',
      boletoLink: 'www.svfasfa.com/sf',
      totalPayees: 5,
      projectId: project.id,
      state: 'WAITING',
      installments: 3,
      purpose: 'PROJECT_INVESTIMENT',
      moipOrderId: '097adgu9',
    });

    expect(payment).toHaveProperty('id');
  });

  it('should be able to update the state of payment to REFUNDED', async () => {
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

    project.paidback = '3000';

    const payment = await createPayment.execute({
      amount: '3000',
      reimburserId: 4,
      moipId: 'a987fsfau',
      boletoLink: 'www.svfasfa.com/sf',
      totalPayees: 5,
      projectId: project.id,
      state: 'WAITING',
      installments: 3,
      purpose: 'PROJECT_INVESTIMENT',
      moipOrderId: '097adgu9',
    });

    expect(payment).toHaveProperty('id');
  });
});
