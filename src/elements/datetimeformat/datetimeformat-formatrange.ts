import {html, nothing} from 'lit';

import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer.js';

export default class HTMLIntlDateTimeFormatFormatRangeElement
    extends AbstractDateTimeFormatConsumer {
  #value: string = '';

  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.start && this.end && this.providerElement) {
      try {
        this.#value =
            this.providerElement.intlObject.formatRange(this.start, this.end);
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
