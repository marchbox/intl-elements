import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlPluralRulesElement from './pluralrules.js';

type ValueType = Intl.LDMLPluralRule | '';

export default abstract class AbstractPluralRulesConsumer
    extends AbstractConsumer<HTMLIntlPluralRulesElement, ValueType> {
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

  protected get content(): DocumentFragment {
    let content = this.getTemplateContent(this.value)[0] ??
        this.getTemplateContent('other')[0] ??
        this.getTemplateContent()[0]!;

    const insEls = content.querySelectorAll('ins');
    insEls.forEach((insEl, i) => {
      const insText = i === 0 ? this.start : this.end;
      content.replaceChild(document.createTextNode(insText.toString()), insEl);
    });
    content.normalize();

    return content;
  }

  override connectedCallback() {
    super.connectedCallback();

    if (!this.querySelector('template[slot="other"]') &&
        !this.querySelector('template:not([slot])')) {
      this.isValid = false;
    }
  }
}
