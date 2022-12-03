import {html} from 'lit';

import HTMLIntlRelativeTimeFormatConsumerElement from './abstract-intl-relativetimeformat-consumer-element';

export default class extends HTMLIntlRelativeTimeFormatConsumerElement {
  #value: Intl.RelativeTimeFormatPart[] = [];

  override get value(): Intl.RelativeTimeFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.rtime && this.unit && this.provider) {
      try {
        this.#value = this.provider.intlObject.formatToParts(
          this.rtime,
          this.unit as Intl.RelativeTimeFormatUnit
        );
      } catch {}
    }

    return html`
      <span role="none" part="value">
        ${this.#value.map(part =>
            html`<span part="${part.type}" role="none">${part.value}</span>`)}
      </span>
      <slot name="rtime"></slot>
      <slot name="unit"></slot>
      <slot></slot>
    `;
  }
}
