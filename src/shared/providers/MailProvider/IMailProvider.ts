import { ITemplateValues } from '../TemplateProvider/ITemplateProvider';

export interface IMailDTO {
  to: string[];
  subject: string;
  body: {
    template: string;
    values: ITemplateValues;
  };
}

export interface IMailProvider {
  sendMail(dto: IMailDTO): Promise<void>;
}
