import {html} from 'lit';

import AbstractIntlRelativeTimeFormatConsumerElement from './abstract-intl-relativetimeformat-consumer-element';

export default class extends AbstractIntlRelativeTimeFormatConsumerElement {
  #value: string = '';

  override get value(): string {
    return this.#value;
  }

  override render() {
    if (this.rtime && this.unit && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(
            this.rtime, this.unit as Intl.RelativeTimeFormatUnit);
      } catch {}
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <span aria-hidden="true" hidden>
        <slot name="rtime"></slot>
        <slot name="unit"></slot>
        <slot></slot>
      </span>
    `;
  }
}
