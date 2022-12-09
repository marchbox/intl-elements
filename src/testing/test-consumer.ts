import {html} from 'lit';

import AbstractConsumer from '../elements/abstract-consumer';
import TestProvider from './test-provider';

export default class extends AbstractConsumer<TestProvider, string> {
  protected static override providerElementName = 'intl-foo';

  #value: string = '';

  get #data(): string {
    return this.getDataValue()[0] ?? '';
  }

  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.#data && this.providerElement) {
      this.#value = this.providerElement.intlObject.format(this.#data);
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}
