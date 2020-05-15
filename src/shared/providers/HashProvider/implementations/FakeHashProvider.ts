import { IHashProvider } from '../IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async hash(string: string): Promise<string> {
    return `hashed: ${string}`;
  }

  public async compare(string: string, hashedString: string): Promise<boolean> {
    return hashedString === `hashed: ${string}`;
  }
}

export default FakeHashProvider;
