import AppError from '@shared/errors/AppErrors';

import FakePaymentRepository from '../../repositories/fakes/FakePaymentRepository';
import CreatePaymentService from '../CreatePaymentService';
import FakeCreatePaymentService from '../fakes/FakeCreatePaymentService';

let fakepaymentRepository: FakePaymentRepository;
let fakecreatePayment: FakeCreatePaymentService;
let createPayment: CreatePaymentService;

describe('CreatePaymentService', () => {
  beforeEach(() => {
    fakepaymentRepository = new FakePaymentRepository();
    fakecreatePayment = new FakeCreatePaymentService(fakepaymentRepository);
    createPayment = new CreatePaymentService(fakepaymentRepository);
  });

  it('should be able to create a payment', async () => {
    expect(
      createPayment.execute({
        amount: '432',
        purpose: 'INVESTIMENT',
        moipId: 's0a98fsa9saas',
        boletoLink: 'www.fopspfao.com/saf',
        payeeId: 4,
        projectId: 5,
        state: 'WAITING',
        payorId: 4,
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
      amount: '432',
      purpose: 'INVESTIMENT',
      moipId: 's0a98fsa9saas',
      boletoLink: 'www.fopspfao.com/saf',
      payeeId: 5,
      projectId: project.id,
      state: 'WAITING',
      payorId: 4,
    });

    expect(payment).toHaveProperty('id');
  });

  it('should be able to update the project state to COMPLETED when the amount raised is equal to project goal', async () => {
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

    project.raised = '2500';

    const payment = await createPayment.execute({
      amount: '500',
      purpose: 'INVESTIMENT',
      moipId: 's0a98fsa9saas',
      boletoLink: 'www.fopspfao.com/saf',
      payeeId: 5,
      projectId: project.id,
      state: 'WAITING',
      payorId: 4,
    });

    expect(payment).toHaveProperty('id');
  });
});
