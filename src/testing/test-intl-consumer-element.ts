import {html} from 'lit';

import AbstractIntlConsumerElement from '../elements/abstract-intl-consumer-element';
import TestIntlProviderElement from './test-intl-provider-element';

export default class extends AbstractIntlConsumerElement<TestIntlProviderElement, string> {
  protected static override providerElementName = 'intl-foo';

  #value: string = '';

  get #data(): string {
    return this.getData()[0] ?? '';
  }

  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.#data && this.provider) {
      this.#value = this.provider.intlObject.format(this.#data);
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}
