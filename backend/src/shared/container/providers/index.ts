import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import uploadConfig from '@config/upload';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import GCSStorageProvider from './StorageProvider/implementations/GoogleCloudStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailJetProvider from './MailProvider/implementations/MailJetProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  uploadConfig.driver === 'disk'
    ? container.resolve(DiskStorageProvider)
    : container.resolve(GCSStorageProvider),
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(MailJetProvider),
);
