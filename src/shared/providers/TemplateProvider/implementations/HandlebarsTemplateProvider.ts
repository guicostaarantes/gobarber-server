import handlebars from 'handlebars';
import { ITemplateProvider, ITemplateValues } from '../ITemplateProvider';

class HandlebarsTemplateProvider implements ITemplateProvider {
  public async parse(
    template: string,
    values: ITemplateValues,
  ): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(values);
  }
}

export default HandlebarsTemplateProvider;
