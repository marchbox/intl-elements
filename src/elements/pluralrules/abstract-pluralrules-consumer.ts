import AbstractConsumer from '../abstract-consumer';
import HTMLIntlPluralRulesElement from './pluralrules';

type ValueType = Intl.LDMLPluralRule | '';

export default abstract class extends AbstractConsumer<HTMLIntlPluralRulesElement, ValueType> {
  protected static override providerElementName = 'intl-pluralrules';

  protected get data(): number {
    return Number(this.getDataValue()[0]);
  }

  protected get start(): number {
    return Number(this.getDataValue('start')[0] ?? this.getDataValue()[0]);
  }

  protected get end(): number {
    return Number(this.getDataValue('end')[0] ?? this.getDataValue()[1]);
  }

  protected get zero(): DocumentFragment | undefined {
    return this.getTemplateContent('zero')[0] ?? undefined;
  }

  protected get one(): DocumentFragment | undefined {
    return this.getTemplateContent('one')[0] ?? undefined;
  }

  protected get two(): DocumentFragment | undefined {
    return this.getTemplateContent('two')[0] ?? undefined;
  }

  protected get few(): DocumentFragment | undefined {
    return this.getTemplateContent('few')[0] ?? undefined;
  }

  protected get many(): DocumentFragment | undefined {
    return this.getTemplateContent('many')[0] ?? undefined;
  }

  protected get other(): DocumentFragment | undefined {
    return this.getTemplateContent('other')[0] ?? undefined;
  }
}
