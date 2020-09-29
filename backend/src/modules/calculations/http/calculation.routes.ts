import { Router } from 'express';

import Interest from '@modules/calculations/http/controllers/InterestController';
import FirgunInterest from '@modules/calculations/http/controllers/FirgunInterestController';
import Supporter from '@modules/calculations/http/controllers/SupporterInterestController';
import Partner from '@modules/calculations/http/controllers/PartnerInterestController';
import Renegotiation from '@modules/calculations/http/controllers/RenegotiationController';
import ensureAuthenticated from '@modules/calculations/middlewares/ensureAuthenticated';

const calculationRouter = Router();

const interest = new Interest();
const supporter = new Supporter();
const firgun = new FirgunInterest();
const partner = new Partner();
const renegotiation = new Renegotiation();

calculationRouter.post('/installment', interest.calculate);
calculationRouter.post('/firgun-amount', firgun.calculate);
calculationRouter.post('/supporter-installment', supporter.calculate);
calculationRouter.post('/partner-installment', partner.calculate);
calculationRouter.post(
  '/renegotiation',
  ensureAuthenticated,
  renegotiation.calculate,
);

export default calculationRouter;
