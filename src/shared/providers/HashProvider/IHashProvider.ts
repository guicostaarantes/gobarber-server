export interface IHashProvider {
  hash(string: string): Promise<string>;
  compare(string: string, hashedString: string): Promise<boolean>;
}
