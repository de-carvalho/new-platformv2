import { Router } from 'express';
import multer from 'multer';
import uploadDocuments from '@config/upload_supporter_documents';
import { celebrate, Segments, Joi } from 'celebrate';

import GetLoanSituationController from '../controllers/supporters/GetLoanSituationController';
import GetBankStatementController from '../controllers/supporters/GetBankStatementController';
import WithDrawnMonyeController from '../controllers/supporters/WithdrawnMoneyController';
import SetDocumentsController from '../controllers/supporters/SetDocumentsController';
import ResendDocumentController from '../controllers/supporters/ResendDocumentController';
import DeleteDocumentController from '../controllers/supporters/DeleteSupporterDocumentController';
import CreateSupporterProfileController from '../controllers/supporters/CreateSupporterProfileController';
import GetSupporterProfileController from '../controllers/supporters/GetSupporterProfileController';
import UpdateSupporterProfileController from '../controllers/supporters/UpdateSupporterProfileController';
import GetFirgunDocumentsController from '../controllers/supporters/GetFirgunDocumentsController';
import GetSupporterDocumentsController from '../controllers/supporters/GetDocumentsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const supporterRouter = Router();

const getLoanSituantionController = new GetLoanSituationController();
const getBankStatementController = new GetBankStatementController();
const withDrawnMonyeController = new WithDrawnMonyeController();
const setDocumentsController = new SetDocumentsController();
const resendDocumentController = new ResendDocumentController();
const deleteDocumentController = new DeleteDocumentController();
const createSupporterProfileController = new CreateSupporterProfileController();
const getSupporterProfileController = new GetSupporterProfileController();
const updateSupporterProfileController = new UpdateSupporterProfileController();
const getFirgunDocumentsController = new GetFirgunDocumentsController();
const getSupporterDocumentsController = new GetSupporterDocumentsController();
const upload_documents = multer(uploadDocuments.multer);

supporterRouter.get(
  '/loan-situation',
  ensureAuthenticated,
  getLoanSituantionController.index,
);
supporterRouter.get(
  '/bank-statement',
  ensureAuthenticated,
  getBankStatementController.index,
);
supporterRouter.post(
  '/withdrawn-money',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  withDrawnMonyeController.create,
);

supporterRouter.get(
  '/documents',
  ensureAuthenticated,
  getSupporterDocumentsController.show,
);

supporterRouter.post(
  '/documents',
  ensureAuthenticated,
  upload_documents.single('document'),
  setDocumentsController.create,
);
supporterRouter.patch(
  '/resend-document',
  ensureAuthenticated,
  upload_documents.single('document'),
  resendDocumentController.update,
);
supporterRouter.delete(
  '/delete-document',
  ensureAuthenticated,
  deleteDocumentController.delete,
);

supporterRouter.post(
  '/profile',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      alreadyInvests: Joi.boolean().required(),
      howDoYouConsidereYourself: Joi.number().required(),
      howMuchWantToInvest: Joi.number().required(),
      typesOfcauses: Joi.string().required(),
      wantToReceiveEmail: Joi.boolean().required(),
      wantToReceiveInformation: Joi.boolean().required(),
      wantToReinvestBalance: Joi.boolean().required(),
    }),
  }),
  ensureAuthenticated,
  createSupporterProfileController.create,
);
supporterRouter.get(
  '/profile',
  ensureAuthenticated,
  getSupporterProfileController.index,
);
supporterRouter.put(
  '/profile',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      alreadyInvests: Joi.boolean().required(),
      howDoYouConsidereYourself: Joi.number().required(),
      howMuchWantToInvest: Joi.number().required(),
      typesOfcauses: Joi.string().required(),
      wantToReceiveEmail: Joi.boolean().required(),
      wantToReceiveInformation: Joi.boolean().required(),
      wantToReinvestBalance: Joi.boolean().required(),
    }),
  }),
  ensureAuthenticated,
  updateSupporterProfileController.update,
);
supporterRouter.get(
  '/firgun-documents',
  ensureAuthenticated,
  getFirgunDocumentsController.index,
);

export default supporterRouter;
