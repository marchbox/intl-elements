import {html, nothing} from 'lit';

import AbstractPluralRulesConsumer from './abstract-pluralrules-consumer';

export default class extends AbstractPluralRulesConsumer {
  protected static override providerElementName = 'intl-pluralrules';

  #value: Intl.LDMLPluralRule | '' = '';

  get value(): Intl.LDMLPluralRule | '' {
    return this.#value;
  }

  override render() {
    if (this.providerElement && !isNaN(this.data)) {
      try {
        this.#value = this.providerElement.intlObject.select(this.data);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${this.content}</span>
      <span aria-hidden="true" hidden>
        <slot></slot>
        <slot name="zero"></slot>
        <slot name="one"></slot>
        <slot name="two"></slot>
        <slot name="few"></slot>
        <slot name="many"></slot>
        <slot name="other"></slot>
      </span>
    `;
  }
}
