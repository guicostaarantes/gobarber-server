import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IMailProvider } from '../../../shared/providers/MailProvider/IMailProvider';
import { ITokenProvider } from '../../../shared/providers/TokenProvider/ITokenProvider';

interface IServiceRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email }: IServiceRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email, ['id']);

    if (!user) {
      await new Promise(resolve =>
        setTimeout(resolve, 2000 * (1 + Math.random())),
      );
      return;
    }

    const token = await this.tokenProvider.generate(user.id, 'forgot-password');

    await this.mailProvider.sendMail({
      to: [email],
      subject: 'Recuperação de senha',
      body: {
        template: await fs.promises.readFile(
          path.join(__dirname, '..', 'templates', 'forgot-password.hbs'),
          { encoding: 'utf-8' },
        ),
        values: {
          link: `${process.env.CLIENT_BASE_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
