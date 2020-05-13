import { sign, verify } from 'jsonwebtoken';
import { ITokenProvider, ITokenPayload } from '../ITokenProvider';

class JWTokenProvider implements ITokenProvider {
  public async generate(subject: string, type: string): Promise<string> {
    return sign({ sub: subject, typ: type }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  public async check(token: string): Promise<ITokenPayload> {
    const payload = verify(token, process.env.JWT_SECRET_KEY) as {
      typ: string;
      sub: string;
    };
    const result = { ...payload, type: payload.typ, subject: payload.sub };
    delete result.typ;
    delete result.sub;
    return result;
  }
}

export default JWTokenProvider;
