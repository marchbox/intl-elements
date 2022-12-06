import {html} from 'lit';

import AbstractListFormatConsumer from './abstract-listformat-consumer';

export default class extends AbstractListFormatConsumer {
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
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}
