import { ITokenProvider, ITokenPayload } from '../ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public tokens: string[] = [];

  public async generate(subject: string, type: string): Promise<string> {
    const token = Buffer.from(JSON.stringify({ subject, type })).toString(
      'base64',
    );
    this.tokens.push(token);
    return token;
  }

  public async check(token: string): Promise<ITokenPayload> {
    const index = this.tokens.findIndex(_token => _token === token);
    return JSON.parse(
      Buffer.from(this.tokens[index], 'base64').toString('utf8'),
    );
  }
}

export default FakeTokenProvider;
