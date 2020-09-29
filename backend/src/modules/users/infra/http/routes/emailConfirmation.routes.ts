import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SendEmailConfirmationController from '../controllers/SendEmailConfirmationController';
import ConfimrEmailController from '../controllers/ConfirmEmailController';

const emailRouter = Router();
const emailConfirmationController = new SendEmailConfirmationController();
const confimrEmailController = new ConfimrEmailController();

emailRouter.post(
  '/send-confirmation',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  emailConfirmationController.create,
);
emailRouter.post(
  '/confirm',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().required(),
    }),
  }),
  confimrEmailController.create,
);

export default emailRouter;
