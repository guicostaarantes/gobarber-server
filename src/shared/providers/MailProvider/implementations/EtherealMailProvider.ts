import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailProvider, IMailDTO } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Mail;

  constructor() {
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
      html: dto.body,
    });

    // eslint-disable-next-line no-console
    console.log(nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
