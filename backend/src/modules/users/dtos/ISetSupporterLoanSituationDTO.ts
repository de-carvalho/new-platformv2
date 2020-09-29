export default interface ISetSupporterLoanSituationDTO {
  projectName: string;
  amountInvested: string;
  amountReceived?: string;
  amountCorrected: string;
  amountInterest: string;
  installmentPayed: number;
  totalInstallments: number;
  refundStatus: string;
  status: string;
  userId: number;
  projectId: number;
}
