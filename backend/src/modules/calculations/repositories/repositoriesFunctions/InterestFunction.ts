interface ISupporterAmount {
  installmentAmount: number;
  amountTotal: number;
  monthyInterest: number;
  amountCorrected: number;
}

export default interface IInterestRepository {
  installmentAmount(amount: string, times: number): Promise<number>;
  monthlyInterest(amount: string, interest: string): Promise<number>;
  totalToPayBack(installmentAmount: string, times: number): Promise<number>;
  firgunAmount(amount: string): Promise<number>;
  partnerAmount(amount: string): Promise<number>;
  supporterAmount(
    amountInvested: string,
    amountEntrepreneur: string,
    balanceDue: string,
    times: number,
  ): Promise<ISupporterAmount>;
  renegotiation(
    intallmentAmount: string,
    installmentDate: Date,
  ): Promise<number>;
}
