import {html} from 'lit';

import AbstractIntlRelativeTimeFormatConsumerElement from './abstract-intl-relativetimeformat-consumer-element';

export default class extends AbstractIntlRelativeTimeFormatConsumerElement {
  #value: string = '';

  override get value(): string {
    return this.#value;
  }

  override render() {
    if (this.rtime && this.unit && this.provider) {
      try {
        this.#value = this.provider.intlObject.format(
            this.rtime, this.unit as Intl.RelativeTimeFormatUnit);
      } catch {}
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot name="rtime"></slot>
      <slot name="unit"></slot>
      <slot></slot>
    `;
  }
}
