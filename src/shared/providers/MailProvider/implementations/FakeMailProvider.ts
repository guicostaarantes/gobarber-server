import { IMailProvider, IMailDTO } from '../IMailProvider';

class FakeMailProvider implements IMailProvider {
  public mails: IMailDTO[] = [];

  public async sendMail(dto: IMailDTO): Promise<void> {
    this.mails.push(dto);
  }
}

export default FakeMailProvider;
