import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '../controllers/PaymentsController';
import RefundController from '../controllers/RefundController';
import TransfersController from '../controllers/TransfersController';
import GetAllDebtController from '../controllers/GetAllDebtToPayController';
import PayOffAllDebtController from '../controllers/PayOffAllDebtController';

const paymentsRouter = Router();
paymentsRouter.use(ensureAuthenticated);

const paymentsController = new PaymentsController();
const refundsController = new RefundController();
const transfersController = new TransfersController();
const getAllDebtController = new GetAllDebtController();
const payOffAllDebtController = new PayOffAllDebtController();

paymentsRouter.post(
  '/investiment',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      value: Joi.string().required(),
      paymentType: Joi.string().required(),
      name: Joi.string().optional(),
      confirmationToShowPhoto: Joi.boolean().default(false),
      taxDocumentType: Joi.string().optional(),
      taxDocumentNumber: Joi.string().optional(),
      creditCardNumber: Joi.string().optional(),
      creditCardExpirationMonth: Joi.string().optional(),
      creditCardExpirationYear: Joi.string().optional(),
      creditCardCvc: Joi.string().optional(),
      birthdate: Joi.string().optional(),
    }),
  }),
  paymentsController.create,
);
paymentsRouter.post(
  '/refund',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.string().required(),
      installments: Joi.number().required(),
      purpose: Joi.string().required(),
    }),
  }),
  refundsController.create,
);
paymentsRouter.post(
  '/transfers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      taxDocumentType: Joi.string().required(),
      taxDocumentNumber: Joi.string().required(),
      amount: Joi.string().required(),
      accountType: Joi.string().required(),
      bankNumber: Joi.string().required(),
      agencyNumber: Joi.string().required(),
      agencyCheckNumber: Joi.number().required(),
      accountNumber: Joi.string().required(),
      accountCheckNumber: Joi.number().required(),
      method: Joi.string().required(),
    }),
  }),
  transfersController.create,
);
paymentsRouter.get('/all-debt', getAllDebtController.index);
paymentsRouter.post(
  '/all-debt',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.string().required(),
      installments: Joi.number().required(),
      purpose: Joi.string().required(),
    }),
  }),
  payOffAllDebtController.create,
);

export default paymentsRouter;
