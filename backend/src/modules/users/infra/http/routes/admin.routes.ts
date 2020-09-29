import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import uploadDocument from '@config/upload_admin_documents';
import { celebrate, Segments, Joi } from 'celebrate';

import CheckProjectController from '../controllers/admin/CheckProjectController';
import SendDocumentsToSupporterController from '../controllers/admin/SendDocumentsToSupporterController';
import FirgunTeamController from '../controllers/admin/FirgunTeamController';
import UpdateTeamMemberAvatarController from '../controllers/admin/UpdateTeamMemberAvatarController';
import AboutFirgunController from '../controllers/admin/AboutFirgunController';
import GetSupporterDocumentsController from '../controllers/admin/GetSupporterDocumentsController';
import GetEntrepreneurDocumentsController from '../controllers/admin/GetEntrepreneurDocumentsController';
import SendDocumentsToEntrepreneurController from '../controllers/admin/SendDocumentsToEntrepreneurController ';
import QuizController from '../controllers/admin/QuizController';
import QuizAnswerController from '../controllers/admin/QuizAnswerController';
import LiberateProjectWithdrawController from '../controllers/admin/LiberateWithdrawController';
import GetProjectToLiberateWithdrawController from '../controllers/admin/GetProjectsToLiberateWithdrawController';
import GetProjectsConfirmedController from '../controllers/admin/GetProjectsConfirmedController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const adminRouter = Router();

const checkProjectController = new CheckProjectController();
const sendDocumentsToSupporter = new SendDocumentsToSupporterController();
const projectsToLiberateWithdraw = new GetProjectToLiberateWithdrawController();
const liberateProjectsToWithdraw = new LiberateProjectWithdrawController();
const sendDocumentsToEntrepreneur = new SendDocumentsToEntrepreneurController();
const firgunTeamController = new FirgunTeamController();
const updateTeamMemberAvatarController = new UpdateTeamMemberAvatarController();
const aboutFirgunController = new AboutFirgunController();
const getSupporterDocumentsController = new GetSupporterDocumentsController();
const getEntrepreneurDocumentsController = new GetEntrepreneurDocumentsController();
const quizController = new QuizController();
const quizAnswerController = new QuizAnswerController();
const getProjectsConfirmedController = new GetProjectsConfirmedController();
const upload = multer(uploadConfig.multer);
const upload_documents = multer(uploadDocument.multer);

adminRouter.post(
  '/check-project',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      loanMargin: Joi.number().required(),
      totalInstallments: Joi.number().required(),
      receiveDate: Joi.date().required(),
      receiveDate2: Joi.date().required(),
      analysisResult: Joi.boolean().required(),
      interestCollective: Joi.string().required(),
      interestDebenture: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  checkProjectController.create,
);

adminRouter.get(
  '/projects-confirmed',
  ensureAuthenticated,
  getProjectsConfirmedController.index,
);

adminRouter.get(
  '/projects-to-liberate',
  ensureAuthenticated,
  projectsToLiberateWithdraw.index,
);

adminRouter.post(
  '/project-liberate',
  ensureAuthenticated,
  liberateProjectsToWithdraw.create,
);

adminRouter.get('/quiz', ensureAuthenticated, quizController.index);

adminRouter.post(
  '/quiz',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      question: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  quizController.create,
);

adminRouter.put(
  '/quiz',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      question: Joi.string().required(),
      questionId: Joi.number().required(),
    }),
  }),
  ensureAuthenticated,
  quizController.update,
);

adminRouter.get(
  '/quiz-answer',
  ensureAuthenticated,
  quizAnswerController.index,
);

adminRouter.put(
  '/quiz-answer',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      answer: Joi.string().required(),
      point: Joi.string().required(),
      answerId: Joi.number().required(),
    }),
  }),
  ensureAuthenticated,
  quizAnswerController.update,
);

adminRouter.put(
  '/quiz-answer',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      answer: Joi.string().required(),
      point: Joi.string().required(),
      answerId: Joi.number().required(),
    }),
  }),
  ensureAuthenticated,
  quizAnswerController.update,
);

adminRouter.get(
  '/supporters-documents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      supporterId: Joi.number().required(),
    }),
  }),
  ensureAuthenticated,
  getSupporterDocumentsController.show,
);

adminRouter.get(
  '/entrepreneurs-documents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      entrepreneurId: Joi.number().required(),
      projectId: Joi.number().required(),
    }),
  }),
  ensureAuthenticated,
  getEntrepreneurDocumentsController.show,
);

adminRouter.get(
  '/check-project',
  ensureAuthenticated,
  checkProjectController.index,
);

adminRouter.post(
  '/firgun-team',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      linkedin: Joi.string().allow(null, ''),
      cellPhoneNumber: Joi.string().allow(null, ''),
      cpfNumber: Joi.string().allow(null, ''),
      occupation: Joi.string().allow(null, ''),
    }),
  }),
  ensureAuthenticated,
  firgunTeamController.create,
);

adminRouter.get('/firgun-team', firgunTeamController.index);

adminRouter.put(
  '/firgun-team',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().allow(null, ''),
      lastName: Joi.string().allow(null, ''),
      email: Joi.string().email().allow(null, ''),
      linkedin: Joi.string().allow(null, ''),
      cellPhoneNumber: Joi.string().allow(null, ''),
      cpfNumber: Joi.string().allow(null, ''),
      occupation: Joi.string().allow(null, ''),
    }),
  }),
  ensureAuthenticated,
  firgunTeamController.update,
);

adminRouter.patch(
  '/firgun-team',
  ensureAuthenticated,
  upload.single('avatar'),
  updateTeamMemberAvatarController.update,
);

adminRouter.delete(
  '/delete-team-member',
  ensureAuthenticated,
  firgunTeamController.delete,
);

adminRouter.get('/about-firgun', aboutFirgunController.index);

adminRouter.post(
  '/about-firgun',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      about: Joi.string().allow(null, ''),
      awards: Joi.string().allow(null, ''),
      press: Joi.string().allow(null, ''),
    }),
  }),
  ensureAuthenticated,
  aboutFirgunController.create,
);

adminRouter.put(
  '/update-about-firgun',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      about: Joi.string().allow(null, ''),
      awards: Joi.string().allow(null, ''),
      press: Joi.string().allow(null, ''),
    }),
  }),
  ensureAuthenticated,
  aboutFirgunController.update,
);

adminRouter.get(
  '/documents-entrepreneur',
  ensureAuthenticated,
  sendDocumentsToEntrepreneur.show,
);

adminRouter.post(
  '/send-document-to-entrepreneur',
  ensureAuthenticated,
  upload_documents.single('document'),
  sendDocumentsToEntrepreneur.create,
);

adminRouter.post(
  '/send-document-to-supporter',
  ensureAuthenticated,
  upload_documents.single('document'),
  sendDocumentsToSupporter.create,
);

adminRouter.put(
  '/resend-document-to-supporter',
  ensureAuthenticated,
  upload_documents.single('document'),
  sendDocumentsToSupporter.update,
);

adminRouter.get(
  '/documents-supporter',
  ensureAuthenticated,
  sendDocumentsToSupporter.show,
);

export default adminRouter;
