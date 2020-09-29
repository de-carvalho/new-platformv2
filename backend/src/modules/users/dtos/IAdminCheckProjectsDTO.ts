export default interface IAdminCheckProjectDTO {
  entrepreneurId: number;
  projectId: number;
  projectType: number;
  amountWanted: string;
  receiveDate?: Date;
  totalInstallments: number;
  entrepreneurDocsId: number;
}
