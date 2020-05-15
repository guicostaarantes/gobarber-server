export interface ITemplateValues {
  [key: string]: string;
}

export interface ITemplateProvider {
  parse(template: string, values: ITemplateValues): Promise<string>;
}
