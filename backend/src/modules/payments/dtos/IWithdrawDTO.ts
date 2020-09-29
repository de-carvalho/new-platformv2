export default interface IWithdrawDTO {
  amount: string;
  bankNumber: string;
  agencyNumber: string;
  bankAccountNumber: string;
  transferMoipId: string;
  userId: number;
  projectId: number;
  state: string;
}
