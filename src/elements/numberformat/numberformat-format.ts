import {html} from 'lit';

import AbstractNumberFormatConsumer from './abstract-numberformat-consumer';

export default class extends AbstractNumberFormatConsumer {
  #value: string = '';

  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.number && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.number);
      } catch {}
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}
