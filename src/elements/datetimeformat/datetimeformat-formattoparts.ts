import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer';

export default class extends AbstractDateTimeFormatConsumer {
  #value: Intl.DateTimeFormatPart[] = [];

  get value(): Intl.DateTimeFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.dateTime && this.providerElement) {
      try {
        this.#value =
            this.providerElement.intlObject.formatToParts(this.dateTime);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >
        ${map(this.#value, part =>
            html`<span part="${part.type}" role="none">${part.value}</span>`)}
      </span>
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}
