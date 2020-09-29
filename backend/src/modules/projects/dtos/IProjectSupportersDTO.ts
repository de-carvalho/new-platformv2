export default interface IProjectSupporterDTO {
  id?: number;
  amount: string;
  projectId: number;
  userId: number;
  amountPerInstallment: string;
  amountCorrected: string;
  totalInstallments: number;
  amountInterest: string;
  projectState: string;
  projectKind: string;
  confirmationToShowPhoto: boolean;
  totalAmountReceivable: string;
  amountToReceive: string;
}
