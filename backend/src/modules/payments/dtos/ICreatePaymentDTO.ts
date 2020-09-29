export default interface ICreatePaymentDTO {
  amount: string;
  projectId: number;
  payeeId: number;
  payorId: number;
  state: string;
  purpose: string;
  moipId: string;
  boletoLink: string;
}
