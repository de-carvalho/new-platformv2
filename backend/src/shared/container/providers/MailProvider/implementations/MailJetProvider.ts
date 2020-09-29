/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { injectable, inject } from 'tsyringe';
import mailjet from 'node-mailjet';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import mailConfig from '@config/mail';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private mailer: any;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.mailer = mailjet.connect(
      String(process.env.MJ_APIKEY_PUBLIC),
      String(process.env.MJ_APIKEY_PRIVATE),
    );
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;

    await this.mailer.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: from?.email || email,
            Name: from?.name || name,
          },
          To: [
            {
              Email: to.email,
              Name: to.name,
            },
          ],
          Subject: subject,
          HTMLPart: await this.mailTemplateProvider.parse(templateData),
        },
      ],
    });
  }
}
