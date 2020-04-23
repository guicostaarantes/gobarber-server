import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import AppError from '../../errors/AppError';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

const ensureAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('Unauthorized.', 401);
  }

  const [type, token] = req.headers.authorization.split(' ');

  if (type !== 'Bearer') {
    throw new AppError('Unauthorized.', 401);
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
    req.tokenUserId = sub;
    next();
  } catch (err) {
    throw new AppError('Unauthorized.', 401);
  }
};

export default ensureAuthenticated;
