export default interface ICreateProjectDTO {
  id?: number;
  name: string;
  dateLimit: Date;
  description: string;
  goal: string;
  location: string;
  category: string;
  videoUrl: string;
  pageContent: string;
  moipAccountId: string;
  moipToken: string;
  partnerId: number;
  entrepreneurId: number;
  businessTime: string;
  state: string;
  paymentState: string;
}
