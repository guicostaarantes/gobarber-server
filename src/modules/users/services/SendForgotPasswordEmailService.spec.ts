import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '../../../shared/providers/MailProvider/implementations/FakeMailProvider';
import JWTokenProvider from '../../../shared/providers/TokenProvider/implementations/JWTokenProvider';

describe('Send Forgot Password Email Service', () => {
  let usersRepository: FakeUsersRepository;
  let mailProvider: FakeMailProvider;
  let tokenProvider: JWTokenProvider;
  let service: SendForgotPasswordEmailService;
  let sendMailSpy: jest.SpyInstance;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    mailProvider = new FakeMailProvider();
    tokenProvider = new JWTokenProvider();
    service = new SendForgotPasswordEmailService(
      usersRepository,
      mailProvider,
      tokenProvider,
    );
    sendMailSpy = jest.spyOn(mailProvider, 'sendMail');
  });

  beforeEach(async () => {
    const password = await hash('Ful4nO*2020', 8);
    usersRepository.table = [
      {
        id,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        isProvider: false,
        avatar: null,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should be able to send email to reset password', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com.br',
      }),
    ).resolves.toBeUndefined();
    expect(sendMailSpy).toHaveBeenCalledWith({
      to: ['fulano@teste.com.br'],
      subject: 'Recuperação de senha',
      body: 'Acesse este link para recuperar sua senha',
    });
  });

  it('Should not be able to send email to non existing account, but no error should be sent to client', async () => {
    await expect(
      service.execute({
        email: 'ciclano@teste.com.br',
      }),
    ).resolves.toBeUndefined();
    expect(sendMailSpy).toHaveBeenCalledTimes(0);
  });

  it('Should not be able to send more than one email in 24 hours, but no error should be sent to client', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com.br',
      }),
    ).resolves.toBeUndefined();
    await expect(
      service.execute({
        email: 'funalo@teste.com.br',
      }),
    ).resolves.toBeUndefined();
    expect(sendMailSpy).toHaveBeenCalledTimes(1);
  });
});
