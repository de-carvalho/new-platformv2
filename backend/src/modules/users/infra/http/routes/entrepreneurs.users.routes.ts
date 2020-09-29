import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import SetDocumentsController from '../controllers/entrepreneurs/SetDocumentsController';
import ResendDocumentController from '../controllers/entrepreneurs/ResendDocumentController';
import DeleteDocumentController from '../controllers/entrepreneurs/DeleteDocumentController';
import GetBankStatementController from '../controllers/entrepreneurs/GetBankStatementController';
import GetBankStatementToPayController from '../controllers/entrepreneurs/GetBankStatementToPayController';
import LoanMoneyController from '../controllers/entrepreneurs/LoanMoneyController';
import WithdrawMoneyController from '../controllers/entrepreneurs/WithdrawMoneyController';
import GetContractController from '../controllers/entrepreneurs/GetContractController';
import GetDocumentsController from '../controllers/entrepreneurs/GetDocumentsController';
import RequesContractController from '../controllers/entrepreneurs/RequestContractController';
import ConsultContractController from '../controllers/entrepreneurs/ConsultContractController';
import GetProjectAnalisedController from '../controllers/entrepreneurs/GetProjectAnalisedController';
import AnswerQuizController from '../controllers/entrepreneurs/AnswerQuizController';
import GetFirgunDocumentsController from '../controllers/entrepreneurs/GetFirgunDocumentsController';
import SatisfiedWithAmountCapturedController from '../controllers/entrepreneurs/SatisfiedWithAmountCapturedController';
import GetProjectsNotRefundedController from '../controllers/entrepreneurs/GetProjectsNotRefundedController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const entrepreneurRouter = Router();

const setDocumentsController = new SetDocumentsController();
const satisfiedWithAmountController = new SatisfiedWithAmountCapturedController();
const answerQuizController = new AnswerQuizController();
const projectsNotRefundedController = new GetProjectsNotRefundedController();
const resendDocumentController = new ResendDocumentController();
const deleteDocumentController = new DeleteDocumentController();
const getFirgunDocumentsController = new GetFirgunDocumentsController();
const getBankStatementController = new GetBankStatementController();
const getBankStatementToPayController = new GetBankStatementToPayController();
const loanMoneyController = new LoanMoneyController();
const withdrawMoneyController = new WithdrawMoneyController();
const getContractController = new GetContractController();
const getDocumentsController = new GetDocumentsController();
const requesContractController = new RequesContractController();
const consultContractController = new ConsultContractController();
const getProjectAnalisedController = new GetProjectAnalisedController();

const upload = multer(uploadConfig.multer);

entrepreneurRouter.post(
  '/quiz',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      quizScore: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  answerQuizController.create,
);

entrepreneurRouter.post(
  '/project/satisfied-amount',
  ensureAuthenticated,
  satisfiedWithAmountController.create,
);

entrepreneurRouter.get(
  '/firgun-document',
  ensureAuthenticated,
  getFirgunDocumentsController.index,
);

entrepreneurRouter.get(
  '/project-not-refunded',
  ensureAuthenticated,
  projectsNotRefundedController.index,
);

entrepreneurRouter.post(
  '/documents',
  ensureAuthenticated,
  upload.single('document'),
  setDocumentsController.create,
);
entrepreneurRouter.patch(
  '/resend-document',
  ensureAuthenticated,
  upload.single('document'),
  resendDocumentController.update,
);
entrepreneurRouter.delete(
  '/delete-document',
  ensureAuthenticated,
  deleteDocumentController.delete,
);

entrepreneurRouter.get(
  '/bank-statement',
  ensureAuthenticated,
  getBankStatementController.index,
);

entrepreneurRouter.get(
  '/bank-statement-to-pay',
  ensureAuthenticated,
  getBankStatementToPayController.index,
);

entrepreneurRouter.get(
  '/project-analised',
  ensureAuthenticated,
  getProjectAnalisedController.index,
);

entrepreneurRouter.post(
  '/loan-confirmation',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      amountWanted: Joi.number().required(),
      receiveDate: Joi.string(),
      gracePeriod: Joi.string(),
      projectType: Joi.number().required(),
      totalInstallments: Joi.number().required(),
      amountToPayback: Joi.string().required(),
      percentageFee: Joi.string().required(),
      amountPerInstallment: Joi.string().required(),
      confirmedByEntrepreneur: Joi.boolean().required(),
    }),
  }),
  ensureAuthenticated,
  loanMoneyController.create,
);

entrepreneurRouter.post(
  '/withdraw-money',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.number().required(),
    }),
  }),
  ensureAuthenticated,
  withdrawMoneyController.create,
);

entrepreneurRouter.get(
  '/contract',
  ensureAuthenticated,
  getContractController.index,
);

entrepreneurRouter.post(
  '/confirm-contract',
  ensureAuthenticated,
  requesContractController.create,
);

entrepreneurRouter.get(
  '/documents',
  ensureAuthenticated,
  getDocumentsController.index,
);
entrepreneurRouter.get('/contract-pdf', consultContractController.create);

export default entrepreneurRouter;
