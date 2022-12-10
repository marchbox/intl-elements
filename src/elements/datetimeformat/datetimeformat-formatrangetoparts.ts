import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

import {camelToKebab} from '../../utils/strings';
import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer';

export default class extends AbstractDateTimeFormatConsumer {
  #value: Intl.DateTimeFormatPart[] = [];

  get value(): Intl.DateTimeFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.start && this.end && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject
            .formatRangeToParts(this.start, this.end);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >
        ${map(this.#value, part =>
            html`<span part=${[
              camelToKebab(part.type),
              camelToKebab(part.source),
            ].join(' ')}
                role="none">${part.value}</span>`)}
      </span>
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}