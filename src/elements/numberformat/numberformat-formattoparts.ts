import {html} from 'lit';

import AbstractNumberFormatConsumer from './abstract-numberformat-consumer';

export default class extends AbstractNumberFormatConsumer {
  #value: Intl.NumberFormatPart[] = [];

  get value(): Intl.NumberFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.number && this.providerElement) {
      try {
        this.#value =
            this.providerElement.intlObject.formatToParts(this.number);
      } catch {}
    }

    return html`
      <span role="none" part="value">
        ${this.#value.map(part =>
            html`<span part="${part.type}" role="none">${part.value}</span>`)}
      </span>
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}
