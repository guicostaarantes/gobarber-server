export interface IMailDTO {
  to: string[];
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail(dto: IMailDTO): Promise<void>;
}
