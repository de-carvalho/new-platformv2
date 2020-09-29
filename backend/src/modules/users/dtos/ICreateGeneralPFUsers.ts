export default interface ICreateUserPFDTO {
  ownId: string;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  passwordHash: string;
  role: string;
  partnerId: number;
  taxDocumentType: string;
  taxDocumentNumber: string;
  phoneArea: string;
  phoneNumber: string;
  cellphoneArea: string;
  cellphoneNumber: string;
  moipAccountId: string;
  moipCustomerId: string;
  moipToken: string;
  addressCity: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressState: string;
  addressDistrict: string;
  addressZipcode: string;
  accountType: string;
}
