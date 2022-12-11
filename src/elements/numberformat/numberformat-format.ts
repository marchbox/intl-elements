import {html, nothing} from 'lit';

import AbstractNumberFormatConsumer from './abstract-numberformat-consumer';

export default class extends AbstractNumberFormatConsumer {
  #value: string = '';

  get value(): string {
    return this.#value;
  }

  override render() {
    if (!isNaN(this.number) && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.number);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${this.#value}</span>
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}
