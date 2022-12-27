import {html, nothing} from 'lit';

import AbstractNumberFormatConsumer from './abstract-numberformat-consumer.js';

/**
 * @intl Intl.NumberFormat.prototype.format
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format
 *
 * @element intl-numberformat-format
 *
 * @slot - The slotted element must be a `<data>` element with a `value`
 *    attribute. The value is used as the `number` argument of
 *    `Intl.NumberFormat`’s `format()` method.
 *
 * @csspart value - The `<span>` element that contains the string of the
 *     formatted number.
 */
export default class HTMLIntlNumberFormatFormatElement
    extends AbstractNumberFormatConsumer {
  #value: string = '';

  /** @readonly */
  get value(): string {
    return this.#value;
  }

  override render() {
    if (!isNaN(this.number) && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.number);
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
