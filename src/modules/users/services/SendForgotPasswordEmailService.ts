import 'reflect-metadata';
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
      return;
    }

    const token = await this.tokenProvider.generate(user.id, 'forgot-password');

    await this.mailProvider.sendMail({
      to: [email],
      subject: 'Recuperação de senha',
      body: `Acesse este link para recuperar sua senha: ${token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
