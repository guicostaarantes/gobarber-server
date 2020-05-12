import fs from 'fs';
import path from 'path';
import { IStorageProvider } from '../IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private tmpPath = path.join(__dirname, '../../../../..', process.env.TMP_DIR);

  private destinationPath = path.join(
    __dirname,
    '../../../../..',
    process.env.STATIC_DIR,
  );

  public async uploadFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.join(this.tmpPath, filename),
      path.join(this.destinationPath, filename),
    );
    await fs.promises.unlink(path.join(this.tmpPath, filename));
    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    await fs.promises.unlink(path.join(this.destinationPath, filename));
  }
}

export default DiskStorageProvider;
