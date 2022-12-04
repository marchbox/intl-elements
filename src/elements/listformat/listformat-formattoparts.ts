import {html} from 'lit';

import AbstractIntlListFormatConsumerElement from './abstract-intl-listformat-consumer-element';

export default class extends AbstractIntlListFormatConsumerElement {
  #value: Intl.ListFormatPart[] = [];

  override get value(): Intl.ListFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.list && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.formatToParts(this.list);
      } catch {}
    }

    return html`
      <span role="none" part="value">
        ${this.#value.map(part =>
            html`<span part="${part.type}" role="none">${part.value}</span>`)}
      </span>
      <slot></slot>
    `;
  }
}
