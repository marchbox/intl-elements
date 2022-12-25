import {html, nothing} from 'lit';

import AbstractRelativeTimeFormatConsumer from './abstract-relativetimeformat-consumer.js';

export default class HTMLIntlRelativeTimeFormatFormatElement
    extends AbstractRelativeTimeFormatConsumer {
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
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${this.#value}</span>
      <span aria-hidden="true" hidden>
        <slot name="rtime"></slot>
        <slot name="unit"></slot>
        <slot></slot>
      </span>
    `;
  }
}
