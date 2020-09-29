/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import moipServices from '@shared/moip/services';
import UpdateUserPJService from '@modules/users/services/UpdateUserPJService';
import CheckUserService from '@modules/users/services/CheckUserService';

export default class UpdateUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { emailResponsible, companyWebsite, partnerLinkedin } = request.body;
    const { gender, profession, race, partnerFacebook } = request.body;
    const { bankAccountNumber, bankAccountType, cpfResponsible } = request.body;
    const { cellphoneNumber, addressStreet, addressNumber } = request.body;
    const { addressComplement, addressDistrict, addressZipcode } = request.body;
    const { addressCity, addressState, bankNumber, credit } = request.body;
    const { bankAgencyNumber, passwordHash, dob, cellphoneArea } = request.body;
    const { origens, identityIssuer, lastName, firstName } = request.body;
    const { phoneArea, phoneNumber, identityIssueDate } = request.body;
    const { businessName, companyAddressCity, companyName } = request.body;
    const { companyAddressComplement, companyAddressDistrict } = request.body;
    const { companyAddressNumber, companyAddressState } = request.body;
    const { companyAddressStreet, companyAddressZipcode } = request.body;
    const { companyPhoneArea, companyPhoneNumber, email } = request.body;
    const { bankAccountCheckNumber, bankAgencyCheckNumber } = request.body;
    const { partnerInstagram, partnerYoutube, oldPassword } = request.body;
    const { passwordConfirmation } = request.body;

    const updateUser = container.resolve(UpdateUserPJService);
    const checkUser = container.resolve(CheckUserService);

    const userData = {
      firstName,
      lastName,
      email,
      cellphoneArea: companyPhoneArea,
      cellphoneNumber: companyPhoneNumber,
      addressStreet: companyAddressStreet,
      addressNumber: companyAddressNumber,
      addressComplement: companyAddressComplement,
      addressDistrict: companyAddressDistrict,
      addressZipcode: companyAddressZipcode,
      addressCity: companyAddressCity,
      addressState: companyAddressState,
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
      oldPassword,
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
      companyWebsite,
      cpfResponsible,
      emailResponsible,
      bankAccountCheckNumber,
      bankAgencyCheckNumber,
      partnerLinkedin,
      partnerFacebook,
      partnerInstagram,
      partnerYoutube,
      passwordConfirmation,
    });

    return response.json(updatedUser);
  }
}
