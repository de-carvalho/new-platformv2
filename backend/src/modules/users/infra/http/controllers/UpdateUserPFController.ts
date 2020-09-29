/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import moipServices from '@shared/moip/services';
import UpdateUserPFService from '@modules/users/services/UpdateUserPFService';
import CheckUserService from '@modules/users/services/CheckUserService';

export default class UpdateUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { bankAccountNumber, bankAccountType, email } = request.body;
    const { gender, profession, race, cellphoneArea } = request.body;
    const { cellphoneNumber, addressStreet, addressNumber } = request.body;
    const { addressComplement, addressDistrict, addressZipcode } = request.body;
    const { addressCity, addressState, bankNumber, credit } = request.body;
    const { bankAgencyNumber, passwordHash, oldPassword, dob } = request.body;
    const { origens, identityIssuer, lastName, firstName } = request.body;
    const { phoneArea, phoneNumber, identityIssueDate } = request.body;
    const { bankAccountCheckNumber, bankAgencyCheckNumber } = request.body;
    const { passwordConfirmation } = request.body;

    const updateUser = container.resolve(UpdateUserPFService);
    const checkUser = container.resolve(CheckUserService);

    const userData = {
      firstName,
      lastName,
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
    };

    const user = await checkUser.execute(parseInt(`${user_id}`));

    await moipServices.CustomerUpdate(userData, user);

    const updatedUser = await updateUser.execute({
      firstName,
      lastName,
      gender,
      profession,
      race,
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
      passwordHash,
      origens,
      credit,
      phoneArea,
      phoneNumber,
      bankAccountNumber,
      bankAccountType,
      bankAgencyNumber,
      bankNumber,
      identityIssueDate,
      identityIssuer,
      userId: parseInt(`${user_id}`),
      bankAccountCheckNumber,
      bankAgencyCheckNumber,
      oldPassword,
      passwordConfirmation,
    });

    return response.json(updatedUser);
  }
}
