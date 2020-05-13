import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

import AppError from '../../../errors/AppError';
import ValidateAccessTokenService from '../../../services/ValidateAccessTokenService';

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

const ensureAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;
  const service = container.resolve(ValidateAccessTokenService);

  if (!authorization) {
    throw new AppError('Unauthorized.', 401);
  }

  const [type, token] = req.headers.authorization.split(' ');

  if (type !== 'Bearer') {
    throw new AppError('Unauthorized.', 401);
  }

  try {
    const { subject } = await service.execute(token);
    req.tokenUserId = subject;
    next();
  } catch (err) {
    throw new AppError('Unauthorized.', 401);
  }
};

export default ensureAuthenticated;
