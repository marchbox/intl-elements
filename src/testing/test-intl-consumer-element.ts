import {html} from 'lit';

import AbstractIntlConsumerElement from '../elements/abstract-intl-consumer-element';
import TestIntlProviderElement from './test-intl-provider-element';

export default class extends AbstractIntlConsumerElement<TestIntlProviderElement, string> {
  protected static override providerElementName = 'intl-foo';

  #value: string = '';

  get value(): string {
    return this.#value;
  }

  override render() {
    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}
