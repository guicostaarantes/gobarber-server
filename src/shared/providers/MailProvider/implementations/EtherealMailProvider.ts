import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailProvider, IMailDTO } from '../IMailProvider';
import { ITemplateProvider } from '../../TemplateProvider/ITemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Mail;

  constructor(
    @inject('TemplateProvider')
    private templateProvider: ITemplateProvider,
  ) {
    (async (): Promise<void> => {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      this.client = transporter;
    })();
  }

  public async sendMail(dto: IMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to: dto.to,
      subject: dto.subject,
      html: await this.templateProvider.parse(
        dto.body.template,
        dto.body.values,
      ),
    });

    // eslint-disable-next-line no-console
    console.log(nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
