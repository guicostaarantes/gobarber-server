import { hash, compare } from 'bcryptjs';
import { IHashProvider } from '../IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async hash(string: string): Promise<string> {
    const hashed = await hash(string, 8);
    return hashed;
  }

  public async compare(string: string, hashedString: string): Promise<boolean> {
    const comparison = await compare(string, hashedString);
    return comparison;
  }
}

export default BCryptHashProvider;
