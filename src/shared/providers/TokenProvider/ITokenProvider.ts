export interface ITokenPayload {
  type: string;
  subject: string;
  [key: string]: unknown;
}

export interface ITokenProvider {
  generate(subject: string, type: string): Promise<string>;
  check(token: string): Promise<ITokenPayload>;
}
