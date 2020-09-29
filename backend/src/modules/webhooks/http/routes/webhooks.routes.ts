import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateWebhooksController from '../controllers/CreateWebhooksController';
import GetWebhookController from '../controllers/GetWebhookController';
import GetAllWebhooksController from '../controllers/GetAllWebhooksController';
import GetAllNotificationsController from '../controllers/GetAllNotificationsController';
import DeleteWebhookNotificationController from '../controllers/DeleteWebhookNotificationController';

const webhooksRouter = Router();

const createWebhooksController = new CreateWebhooksController();
const getWebhookController = new GetWebhookController();
const getAllWebhooksController = new GetAllWebhooksController();
const getAllNotificationsController = new GetAllNotificationsController();
const deleteNotificationController = new DeleteWebhookNotificationController();

webhooksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      targetUrl: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  createWebhooksController.create,
);
webhooksRouter.get(
  '/one',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      webhookId: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  getWebhookController.index,
);
webhooksRouter.get('/all', ensureAuthenticated, getAllWebhooksController.index);

webhooksRouter.get(
  '/notifications',
  ensureAuthenticated,
  getAllNotificationsController.index,
);

webhooksRouter.delete(
  '/notification',
  ensureAuthenticated,
  deleteNotificationController.delete,
);

export default webhooksRouter;
