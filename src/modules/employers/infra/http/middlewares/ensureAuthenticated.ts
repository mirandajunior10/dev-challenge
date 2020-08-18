// Middleware de autenticação do usuário.

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../../config/auth';

import AppError from '../../.././../../shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT Token é necessário', 401);
  }

  // authHeader possui dois campos, Bearer e token. Essa declaração desconstrói o vetor
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // recupera apenas o subject do token (id do usuário)
    const { sub } = decoded as ITokenPayload;
    request.employer = {
      employer_code: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
