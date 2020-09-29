/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import moipServices from '@shared/moip/services';
import CreateUserPJService from '@modules/users/services/CreateUserPJService';
import CheckUserByEmailAndDocsService from '@modules/users/services/CheckUserByEmailAndDocsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, cellphoneArea, role } = request.body;
    const { cellphoneNumber, addressStreet, addressNumber } = request.body;
    const { addressComplement, addressDistrict, addressZipcode } = request.body;
    const { addressCity, addressState, taxDocumentType, credit } = request.body;
    const { taxDocumentNumber, passwordHash, cpfResponsible } = request.body;
    const { origens, comercialEmail, accountType, partnerId } = request.body;
    const { businessName, companyAddressCity, companyName } = request.body;
    const { companyAddressComplement, companyAddressDistrict } = request.body;
    const { companyAddressNumber, companyAddressState, value } = request.body;
    const { companyAddressStreet, companyAddressZipcode } = request.body;
    const { companyPhoneArea, companyPhoneNumber, dob, email } = request.body;

    const createUser = container.resolve(CreateUserPJService);
    const checkUser = container.resolve(CheckUserByEmailAndDocsService);

    const userData = {
      firstName,
      lastName,
      dob,
      email,
      cellphoneArea,
      cellphoneNumber,
      addressStreet,
      addressNumber,
      addressComplement,
      addressDistrict,
      addressZipcode,
      addressCity,
      addressState,
      taxDocumentType,
      taxDocumentNumber,
      cpfResponsible,
      businessName,
      companyName,
      companyAddressCity,
      companyAddressComplement,
      companyAddressDistrict,
      companyAddressState,
      companyAddressNumber,
      companyAddressStreet,
      companyAddressZipcode,
      companyPhoneArea,
      companyPhoneNumber,
    };

    await checkUser.execute(
      comercialEmail,
      taxDocumentNumber,
      role,
      partnerId,
      accountType,
    );

    const [createdAccount, createdcustomer] = await Promise.all([
      moipServices.AccountCNPJ(userData, comercialEmail),
      moipServices.CustomerCreate(userData, comercialEmail),
    ]);

    const user = await createUser.execute({
      firstName,
      lastName,
      dob,
      emailResponsible: email,
      email: comercialEmail,
      cellphoneArea,
      cellphoneNumber,
      addressStreet,
      addressNumber,
      addressComplement,
      addressDistrict,
      addressZipcode,
      addressCity,
      addressState,
      taxDocumentType,
      taxDocumentNumber,
      passwordHash,
      origens,
      credit,
      value,
      accountType,
      partnerId,
      moipAccountId: createdAccount.id,
      moipToken: createdAccount.accessToken,
      ownId: createdcustomer.ownId,
      moipCustomerId: createdcustomer.id,
      businessName,
      companyAddressCity,
      companyAddressComplement,
      companyAddressDistrict,
      companyAddressNumber,
      companyAddressState,
      companyAddressStreet,
      companyAddressZipcode,
      companyName,
      companyPhoneArea,
      companyPhoneNumber,
      cpfResponsible,
      role,
    });

    return response.json(classToClass(user));
  }
}
