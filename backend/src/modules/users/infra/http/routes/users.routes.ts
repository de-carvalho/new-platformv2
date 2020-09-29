import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UserPFController from '../controllers/UserPFControllers';
import UserPJController from '../controllers/UserPJControllers';
import UserAvatarController from '../controllers/UserAvatarController';
import UpdateUserPFController from '../controllers/UpdateUserPFController';
import UpdateUserPJController from '../controllers/UpdateUserPJController';
import GetAllPartnersController from '../controllers/GetAllPartnersController';
import ShowUserDataController from '../controllers/ShowUserDatasController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

// === Instâncias geral ===
const userPFController = new UserPFController();
const userPJController = new UserPJController();
const usersAvatarController = new UserAvatarController();
const updateUserPFController = new UpdateUserPFController();
const updateUserPJController = new UpdateUserPJController();
const getAllPartnersController = new GetAllPartnersController();
const showUserDataController = new ShowUserDataController();

const upload = multer(uploadConfig.multer);

// === Rotas gerais ===
usersRouter.get('/profile', ensureAuthenticated, showUserDataController.show);

usersRouter.get('/all-partners', getAllPartnersController.show);

usersRouter.post(
  '/pf',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dob: Joi.string().required(),
      email: Joi.string().email().required(),
      cellphoneArea: Joi.string().required(),
      cellphoneNumber: Joi.string().required(),
      addressCity: Joi.string().required(),
      addressStreet: Joi.string().required(),
      addressNumber: Joi.string().required(),
      addressComplement: Joi.string().allow(null, ''),
      addressState: Joi.string().required(),
      addressDistrict: Joi.string().required(),
      addressZipcode: Joi.string().required(),
      taxDocumentType: Joi.string().required(),
      taxDocumentNumber: Joi.string().required(),
      accountType: Joi.string().required(),
      partnerId: Joi.number().allow(null),
      origens: Joi.string().allow(null, ''),
      credit: Joi.string().allow(null, ''),
      value: Joi.string().allow(null, ''),
      role: Joi.string().required(),
      passwordHash: Joi.string().required(),
    }),
  }),
  userPFController.create,
);
usersRouter.post(
  '/pj',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dob: Joi.string().required(),
      email: Joi.string().email().required(),
      cellphoneArea: Joi.string().required(),
      cellphoneNumber: Joi.string().required(),
      addressCity: Joi.string().required(),
      addressStreet: Joi.string().required(),
      addressNumber: Joi.string().required(),
      addressComplement: Joi.string().allow(null, ''),
      addressState: Joi.string().required(),
      addressDistrict: Joi.string().required(),
      addressZipcode: Joi.string().required(),
      taxDocumentType: Joi.string().required(),
      taxDocumentNumber: Joi.string().required(),
      accountType: Joi.string().required(),
      partnerId: Joi.number().allow(null),
      origens: Joi.string().allow(null, ''),
      credit: Joi.string().allow(null, ''),
      value: Joi.string().allow(null, ''),
      role: Joi.string().required(),
      cpfResponsible: Joi.string().required(),
      comercialEmail: Joi.string().email().required(),
      companyName: Joi.string().required(),
      businessName: Joi.string().required(),
      companyPhoneArea: Joi.string().required(),
      companyPhoneNumber: Joi.string().required(),
      companyAddressCity: Joi.string().required(),
      companyAddressStreet: Joi.string().required(),
      companyAddressNumber: Joi.string().required(),
      companyAddressComplement: Joi.string().allow(null, ''),
      companyAddressState: Joi.string().required(),
      companyAddressDistrict: Joi.string().required(),
      companyAddressZipcode: Joi.string().required(),
      passwordHash: Joi.string().required(),
    }),
  }),
  userPJController.create,
);

usersRouter.put(
  '/pf',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().allow(null, ''),
      lastName: Joi.string().allow(null, ''),
      dob: Joi.string().allow(null, ''),
      email: Joi.string().email().allow(null, ''),
      cellphoneArea: Joi.string().allow(null, ''),
      cellphoneNumber: Joi.string().allow(null, ''),
      addressCity: Joi.string().allow(null, ''),
      addressStreet: Joi.string().allow(null, ''),
      addressNumber: Joi.string().allow(null, ''),
      addressComplement: Joi.string().allow(null, ''),
      addressState: Joi.string().allow(null, ''),
      addressDistrict: Joi.string().allow(null, ''),
      addressZipcode: Joi.string().allow(null, ''),
      origens: Joi.string().allow(null, ''),
      credit: Joi.string().allow(null, ''),
      value: Joi.string().allow(null, ''),
      bankNumber: Joi.string().allow(null, ''),
      bankAccountNumber: Joi.string().allow(null, ''),
      bankAccountType: Joi.string().allow(null, ''),
      bankAgencyNumber: Joi.string().allow(null, ''),
      bankAccountCheckNumber: Joi.number().allow(null),
      bankAgencyCheckNumber: Joi.number().allow(null),
      phoneArea: Joi.string().allow(null, ''),
      phoneNumber: Joi.string().allow(null, ''),
      identityIssuer: Joi.string().allow(null, ''),
      identityIssueDate: Joi.string().allow(null, ''),
      race: Joi.string().allow(null, ''),
      profession: Joi.string().allow(null, ''),
      gender: Joi.string().allow(null, ''),
      oldPassword: Joi.string().allow(null),
      passwordHash: Joi.string().allow(null),
      passwordConfirmation: Joi.string().allow(null),
    }),
  }),
  ensureAuthenticated,
  updateUserPFController.update,
);
usersRouter.put(
  '/pj',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().allow(null, ''),
      lastName: Joi.string().allow(null, ''),
      dob: Joi.string().allow(null, ''),
      email: Joi.string().email().allow(null, ''),
      emailResponsible: Joi.string().email().allow(null, ''),
      cpfResponsible: Joi.string().allow(null, ''),
      cellphoneArea: Joi.string().allow(null, ''),
      cellphoneNumber: Joi.string().allow(null, ''),
      addressCity: Joi.string().allow(null, ''),
      addressStreet: Joi.string().allow(null, ''),
      addressNumber: Joi.string().allow(null, ''),
      addressComplement: Joi.string().allow(null, ''),
      addressState: Joi.string().allow(null, ''),
      addressDistrict: Joi.string().allow(null, ''),
      addressZipcode: Joi.string().allow(null, ''),
      origens: Joi.string().allow(null, ''),
      credit: Joi.string().allow(null, ''),
      comercialEmail: Joi.string().email().allow(null, ''),
      companyName: Joi.string().allow(null, ''),
      businessName: Joi.string().allow(null, ''),
      companyPhoneArea: Joi.string().allow(null, ''),
      companyPhoneNumber: Joi.string().allow(null, ''),
      companyAddressCity: Joi.string().allow(null, ''),
      companyAddressStreet: Joi.string().allow(null, ''),
      companyAddressNumber: Joi.string().allow(null, ''),
      companyAddressComplement: Joi.string(),
      companyAddressState: Joi.string().allow(null, ''),
      companyAddressDistrict: Joi.string().allow(null, ''),
      companyAddressZipcode: Joi.string().allow(null, ''),
      companyWebsite: Joi.string().allow(null, ''),
      bankNumber: Joi.string().allow(null, ''),
      bankAccountNumber: Joi.string().allow(null, ''),
      bankAccountType: Joi.string().allow(null, ''),
      bankAgencyNumber: Joi.string().allow(null, ''),
      bankAccountCheckNumber: Joi.number().allow(null),
      bankAgencyCheckNumber: Joi.number().allow(null),
      phoneArea: Joi.string().allow(null, ''),
      phoneNumber: Joi.string().allow(null, ''),
      identityIssuer: Joi.string().allow(null, ''),
      identityIssueDate: Joi.string().allow(null, ''),
      race: Joi.string().allow(null, ''),
      profession: Joi.string().allow(null, ''),
      gender: Joi.string().allow(null, ''),
      oldPassword: Joi.string().allow(null),
      passwordHash: Joi.string().allow(null),
      passwordConfirmation: Joi.string().allow(null),
    }),
  }),
  ensureAuthenticated,
  updateUserPJController.update,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
