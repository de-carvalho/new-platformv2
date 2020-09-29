import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BalanceController from '../controllers/GetAccountBalanceController';

const balancesRouter = Router();
balancesRouter.use(ensureAuthenticated);

const balanceController = new BalanceController();

balancesRouter.get('/', balanceController.index);

export default balancesRouter;
