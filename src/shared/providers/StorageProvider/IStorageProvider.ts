export interface IStorageProvider {
  uploadFile(filename: string): Promise<string>;
  deleteFile(filename: string): Promise<void>;
}
