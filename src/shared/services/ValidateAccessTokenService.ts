import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import {
  ITokenProvider,
  ITokenPayload,
} from '../providers/TokenProvider/ITokenProvider';
import AppError from '../errors/AppError';

@injectable()
class ValidateAccessTokenService {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute(token: string): Promise<ITokenPayload> {
    const payload = await this.tokenProvider.check(token);

    if (payload.type !== 'access-token') {
      throw new AppError('Unauthorized', 401);
    }

    return payload;
  }
}

export default ValidateAccessTokenService;
