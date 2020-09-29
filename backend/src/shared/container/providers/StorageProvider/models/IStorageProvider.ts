export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  saveSupporterDocFile(file: string): Promise<string>;
  saveEntrepreneurDocFile(file: string): Promise<string>;
  saveAdminDocFile(file: string): Promise<string>;
  saveAdminTeamFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  deleteSupporterDocFile(file: string): Promise<void>;
  deleteEntrepreneurDocFile(file: string): Promise<void>;
  deleteAdminDocFile(file: string): Promise<void>;
  deleteAdminTeamFile(file: string): Promise<void>;
}
