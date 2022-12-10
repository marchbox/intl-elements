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

  protected get other(): DocumentFragment {
    return this.getTemplateContent('other')[0] ?? this.getTemplateContent()[0]!;
  }

  override connectedCallback() {
    super.connectedCallback();

    if (!this.querySelector('template[slot="other"]') &&
        !this.querySelector('template:not([slot])')) {
      throw new Error('An intl-pluralrules consumer element requires either' +
          'a template with no slot or a template with a slot of `other`.');
    }
  }

  protected getContent(rule: Intl.LDMLPluralRule, data: number): DocumentFragment {
    let content: DocumentFragment | undefined;

    switch (rule) {
      case 'zero':
        content = this.zero ?? this.other;
        break;
      case 'one':
        content = this.one ?? this.other;
        break;
      case 'two':
        content = this.two ?? this.other;
        break;
      case 'few':
        content = this.few ?? this.other;
        break;
      case 'many':
        content = this.many ?? this.other;
        break;
      default:
        content = this.other;
    }

    const insEls = content.querySelectorAll('ins');
    insEls.forEach(insEl => content!.replaceChild(
      document.createTextNode(data.toString()),
      insEl
    ));
    content.normalize();

    return content;
  }
}
