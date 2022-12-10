import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

import {camelToKebab} from '../../utils/strings';
import HTMLIntlRelativeTimeFormatConsumerElement from './abstract-relativetimeformat-consumer';

export default class extends HTMLIntlRelativeTimeFormatConsumerElement {
  #value: Intl.RelativeTimeFormatPart[] = [];

  override get value(): Intl.RelativeTimeFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.rtime && this.unit && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.formatToParts(
          this.rtime,
          this.unit as Intl.RelativeTimeFormatUnit
        );
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >
        ${map(this.#value, part =>
            html`<span part="${camelToKebab(part.type)}"
                role="none">${part.value}</span>`)}
      </span>
      <span aria-hidden="true" hidden>
        <slot name="rtime"></slot>
        <slot name="unit"></slot>
        <slot></slot>
      </span>
    `;
  }
}
