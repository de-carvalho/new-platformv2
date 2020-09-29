export default interface IGetAccountBalanceDTO {
  accessToken: string;
  future: string;
  date: Date;
  unavailable: string;
  current: string;
  moipAccountId: string;
  userId: number;
}
