import {html, nothing} from 'lit';

import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer';

export default class extends AbstractDateTimeFormatConsumer {
  #value: string = '';

  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.dateTime && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.dateTime);
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
