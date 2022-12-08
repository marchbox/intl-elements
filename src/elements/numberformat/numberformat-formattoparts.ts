import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

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
