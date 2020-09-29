import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EntrepreneursController from '../controllers/partners/EntrepreneursController';
import GetEntrepreneursApprovedController from '../controllers/partners/GetEntrepreneursApprovedController';
import GetProjectsCompletedController from '../controllers/partners/GetProjectsCompletedController';
import GetProjectsInProgressController from '../controllers/partners/GetProjectsInProgressController';
import GetEntrepreneurPortfolioController from '../controllers/partners/GetPortfolioController';
import GetEntrepreneurPortfolioDetailController from '../controllers/partners/GetPortfolioDetailController';
import GetStatementPortfolioController from '../controllers/partners/StatementPortfolioController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const partnersRouter = Router();

const entrepreneursController = new EntrepreneursController();
const getEntrepreneursApprovedController = new GetEntrepreneursApprovedController();
const getProjectsCompletedController = new GetProjectsCompletedController();
const getProjectsInProgressController = new GetProjectsInProgressController();
const getEntrepreneurPortfolioController = new GetEntrepreneurPortfolioController();
const getEntrepreneurPortfolioDetailController = new GetEntrepreneurPortfolioDetailController();
const getStatementPortfolioController = new GetStatementPortfolioController();

partnersRouter.get(
  '/entrepreneurs-to-approve',
  ensureAuthenticated,
  entrepreneursController.index,
);

partnersRouter.get(
  '/entrepreneurs',
  ensureAuthenticated,
  getEntrepreneursApprovedController.index,
);

partnersRouter.get(
  '/projects-completed',
  ensureAuthenticated,
  getProjectsCompletedController.index,
);

partnersRouter.get(
  '/projects-in-progress',
  ensureAuthenticated,
  getProjectsInProgressController.index,
);

partnersRouter.patch(
  '/approve-entrepreneurs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      confirmationStatus: Joi.boolean().required(),
    }),
  }),
  ensureAuthenticated,
  entrepreneursController.create,
);

partnersRouter.get(
  '/entrepreneurs-portfolio',
  ensureAuthenticated,
  getEntrepreneurPortfolioController.index,
);

partnersRouter.get(
  '/entrepreneurs-portfolio-details',
  ensureAuthenticated,
  getEntrepreneurPortfolioDetailController.index,
);
partnersRouter.get('/statement-pdf', getStatementPortfolioController.create);

export default partnersRouter;
