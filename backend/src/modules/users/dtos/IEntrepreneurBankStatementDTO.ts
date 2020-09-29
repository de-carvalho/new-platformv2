export default interface IEntrepreneurBankStatementDTO {
  dueDate: Date;
  userId: number;
  amount: string;
  installment: number;
  status: string;
  state: string;
  projectName: string;
  projectId: number;
}
