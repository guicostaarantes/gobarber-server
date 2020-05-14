import { uuid } from 'uuidv4';
import { JsonWebTokenError } from 'jsonwebtoken';
import ValidateAccessTokenService from './ValidateAccessTokenService';
import JWTokenProvider from '../providers/TokenProvider/implementations/JWTokenProvider';
import AppError from '../errors/AppError';

describe('Validate Access Token Service', () => {
  let tokenProvider: JWTokenProvider;
  let service: ValidateAccessTokenService;

  beforeAll(() => {
    tokenProvider = new JWTokenProvider();
    service = new ValidateAccessTokenService(tokenProvider);
  });

  it('Should get payload from valid token', async () => {
    const userId = uuid();
    const token = await tokenProvider.generate(userId, 'access-token');
    await expect(service.execute(token)).resolves.toHaveProperty(
      'subject',
      userId,
    );
  });

  it('Should throw error if invalid token is received', async () => {
    await expect(service.execute('wrong-token')).rejects.toBeInstanceOf(
      JsonWebTokenError,
    );
  });

  it('Should throw error if token is valid but type is not access-token', async () => {
    const userId = uuid();
    const token = await tokenProvider.generate(userId, 'forgot-password');
    await expect(service.execute(token)).rejects.toBeInstanceOf(AppError);
  });
});
