export default interface ICreatePaymentDTO {
  amount: string;
  projectId: number;
  reimburserId: number;
  state: string;
  moipId: string;
  boletoLink: string;
  totalPayees: number;
  installments: number;
  purpose: string;
  moipOrderId: string;
}
