/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import moipServices from '@shared/moip/services';
import CreateUserPFService from '@modules/users/services/CreateUserPFService';
import CheckUserByEmailAndDocsService from '@modules/users/services/CheckUserByEmailAndDocsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { taxDocumentType, accountType, email, cellphoneArea } = request.body;
    const { cellphoneNumber, addressStreet, addressNumber } = request.body;
    const { addressComplement, addressDistrict, addressZipcode } = request.body;
    const { addressCity, addressState, partnerId } = request.body;
    const { taxDocumentNumber, passwordHash, dob } = request.body;
    const { origens, credit, value, lastName, firstName } = request.body;
    const { phoneArea, phoneNumber, role } = request.body;

    const createUser = container.resolve(CreateUserPFService);
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
    };

    await checkUser.execute(
      email,
      taxDocumentNumber,
      role,
      partnerId,
      accountType,
    );

    const [createdcustomer, createdAccount] = await Promise.all([
      moipServices.CustomerCreate(userData, email),
      moipServices.AccountCPF(userData),
    ]);

    const user = await createUser.execute({
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
      passwordHash,
      origens,
      credit,
      value,
      phoneArea,
      phoneNumber,
      accountType,
      partnerId,
      moipAccountId: createdAccount.id,
      moipToken: createdAccount.accessToken,
      ownId: createdcustomer.ownId,
      moipCustomerId: createdcustomer.id,
      role,
    });

    return response.json(classToClass(user));
  }
}
