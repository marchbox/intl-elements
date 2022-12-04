import {html} from 'lit';

import AbstractIntlListFormatConsumerElement from './abstract-intl-listformat-consumer-element';

export default class extends AbstractIntlListFormatConsumerElement {
  #value: string = '';

  override get value(): string {
    return this.#value;
  }

  override render() {
    if (this.list && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.list);
      } catch {}
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}
