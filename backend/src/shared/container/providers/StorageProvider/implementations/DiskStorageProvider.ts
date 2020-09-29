import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import uploadEntrepreneurConfig from '@config/upload_entrepreneur_documents';
import uploadSupporterConfig from '@config/upload_supporter_documents';
import uploadAdminDocConfig from '@config/upload_admin_documents';
import uploadAdminTeamConfig from '@config/upload_admin_team_avatar';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async saveSupporterDocFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadSupporterConfig.tmpFolder, file),
      path.resolve(uploadSupporterConfig.uploadsFolder, file),
    );

    return file;
  }

  public async saveEntrepreneurDocFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadEntrepreneurConfig.tmpFolder, file),
      path.resolve(uploadEntrepreneurConfig.uploadsFolder, file),
    );

    return file;
  }

  public async saveAdminDocFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadAdminDocConfig.tmpFolder, file),
      path.resolve(uploadAdminDocConfig.uploadsFolder, file),
    );

    return file;
  }

  public async saveAdminTeamFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadAdminTeamConfig.tmpFolder, file),
      path.resolve(uploadAdminTeamConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteSupporterDocFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadSupporterConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteEntrepreneurDocFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadEntrepreneurConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteAdminDocFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadAdminDocConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteAdminTeamFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadAdminTeamConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
