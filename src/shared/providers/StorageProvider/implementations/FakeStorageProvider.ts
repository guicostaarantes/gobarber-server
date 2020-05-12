import { IStorageProvider } from '../IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  public storage: string[] = [];

  public async uploadFile(filename: string): Promise<string> {
    this.storage.push(filename);
    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    this.storage.filter(name => name === filename);
  }
}

export default FakeStorageProvider;
