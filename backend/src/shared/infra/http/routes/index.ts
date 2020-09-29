import { Router } from 'express';

import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import paymentsRouter from '@modules/payments/infra/http/routes/payments.routes';
import balancesRouter from '@modules/balance/infra/http/routes/balances.routes';
import webhooksRouter from '@modules/webhooks/http/routes/webhooks.routes';
import supportersRouter from '@modules/users/infra/http/routes/supporter.users.routes';
import partnersRouter from '@modules/users/infra/http/routes/partners.users.routes';
import entrepreneursRouter from '@modules/users/infra/http/routes/entrepreneurs.users.routes';
import adminRouter from '@modules/users/infra/http/routes/admin.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import emailRouter from '@modules/users/infra/http/routes/emailConfirmation.routes';
import calculationRouter from '@modules/calculations/http/calculation.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/interest', calculationRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/payments', paymentsRouter);
routes.use('/balances', balancesRouter);
routes.use('/webhooks', webhooksRouter);
routes.use('/supporters', supportersRouter);
routes.use('/partners', partnersRouter);
routes.use('/entrepreneurs', entrepreneursRouter);
routes.use('/admin', adminRouter);
routes.use('/password', passwordRouter);
routes.use('/email', emailRouter);

export default routes;
