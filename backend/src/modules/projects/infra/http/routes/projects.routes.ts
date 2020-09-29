import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateProjectsController from '../controllers/CreateProjectsController';
import CancelProjectController from '../controllers/CancelProjectcontroller';
import GeProjectsInProgressController from '../controllers/GetProjectsInProgressController';
import GeProjectsCompletedController from '../controllers/GetProjectsCompletedController';
import GetUserProjectInProgressController from '../controllers/GetUserProjectInProgressController';
import GetUserProjectCompletedController from '../controllers/GetUserProjectsCompletedController';
import GetProjectsSupportersController from '../controllers/GetProjectSupportersController';
import GetProjectsBalanceController from '../controllers/GetProjectBalanceController';
import GetFirgunProjectsController from '../controllers/GetFirgunProjectsController';
import PauseProjectController from '../controllers/PauseProjectController';
import GetPausedProjectsController from '../controllers/GetPausedProjectsController';
import ContinueProjectController from '../controllers/ContinueProjectController';

const projectsRouter = Router();

const createProjectsController = new CreateProjectsController();
const cancelProjectController = new CancelProjectController();
const getProjectInProgressController = new GeProjectsInProgressController();
const getProjectCompletedController = new GeProjectsCompletedController();
const getUserProjectInProgressController = new GetUserProjectInProgressController();
const getUserProjectCompletedController = new GetUserProjectCompletedController();
const getProjectSupportersController = new GetProjectsSupportersController();
const getProjectsBalanceController = new GetProjectsBalanceController();
const getFirgunProjectsController = new GetFirgunProjectsController();
const pauseProjectController = new PauseProjectController();
const getPausedProjectsController = new GetPausedProjectsController();
const continueProjectController = new ContinueProjectController();

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      goal: Joi.string().required(),
      pageContent: Joi.string().required(),
      dateLimit: Joi.string().required(),
      location: Joi.string().required(),
      videoUrl: Joi.string().required(),
      category: Joi.string().required(),
      businessTime: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  createProjectsController.create,
);

projectsRouter.post(
  '/continue',
  ensureAuthenticated,
  continueProjectController.create,
);

projectsRouter.get(
  '/paused',
  ensureAuthenticated,
  getPausedProjectsController.index,
);

projectsRouter.post(
  '/pause',
  ensureAuthenticated,
  pauseProjectController.create,
);

projectsRouter.post(
  '/cancel',
  ensureAuthenticated,
  cancelProjectController.cancel,
);

projectsRouter.get('/in-progress', getProjectInProgressController.index);
projectsRouter.get('/completed', getProjectCompletedController.index);
projectsRouter.get('/investors', getProjectSupportersController.index);
projectsRouter.get('/firgun', getFirgunProjectsController.index);

projectsRouter.get(
  '/balance',
  ensureAuthenticated,
  getProjectsBalanceController.index,
);

projectsRouter.get(
  '/user-in-progress',
  ensureAuthenticated,
  getUserProjectInProgressController.index,
);
projectsRouter.get(
  '/user-completed',
  ensureAuthenticated,
  getUserProjectCompletedController.index,
);

export default projectsRouter;
