export default interface ICreateTransferDTO {
  amount: string;
  accountType: string;
  method: string;
  bankNumber: string;
  agencyNumber: string;
  agencyCheckNumber: number;
  accountNumber: number;
  accountCheckNumber: number;
  fullname: string;
  taxDocumentType: string;
  taxDocumentNumber: string;
  userId: number;
  payeeId: number;
  state: string;
  moipTransfersId: string;
}
