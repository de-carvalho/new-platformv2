/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { Storage } from '@google-cloud/storage';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class GCloudStorageProvider implements IStorageProvider {
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
      credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY,
      },
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);

    const bucket = this.storage.bucket(String(process.env.GCS_BUCKET));

    const blob = bucket.file(file);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => console.log('erro', err));

    blobStream.end(fileContent);
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async saveSupporterDocFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);

    const bucket = this.storage.bucket(
      String(process.env.GCS_BUCKET_SUPPORTERS),
    );

    const blob = bucket.file(file);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => console.log('erro', err));

    blobStream.end(fileContent);
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async saveEntrepreneurDocFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);

    const bucket = this.storage.bucket(
      String(process.env.GCS_BUCKET_ENTREPRENEURS),
    );

    const blob = bucket.file(file);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => console.log('erro', err));

    blobStream.end(fileContent);
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async saveAdminDocFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);

    const bucket = this.storage.bucket(
      String(process.env.GCS_BUCKET_ADMIN_DOCS),
    );

    const blob = bucket.file(file);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => console.log('erro', err));

    blobStream.end(fileContent);
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async saveAdminTeamFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);

    const bucket = this.storage.bucket(String(process.env.GCS_BUCKET));

    const blob = bucket.file(file);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => console.log('erro', err));

    blobStream.end(fileContent);
    await fs.promises.unlink(originalPath);

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
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteEntrepreneurDocFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteAdminDocFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteAdminTeamFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default GCloudStorageProvider;
