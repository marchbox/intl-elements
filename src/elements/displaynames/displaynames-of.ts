import {html, nothing} from 'lit';

import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlDisplayNamesElement from './displaynames.js';

/**
 * @intl Intl.DisplayNames.prototype.of
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/of
 * @intlconsumer
 *
 * @element intl-displaynames-of
 *
 * @slot - The slotted element must be a `<data>` element with a `value`
 *    attribute. The value is used as the `code` argument of
 *    `Intl.DisplayNames`’s `of()` method.
 *
 * @csspart value - The `<span>` element that contains the string of the
 *     display name of the given code.
 */
export default class HTMLIntlDisplayNamesOfElement
    extends AbstractConsumer<HTMLIntlDisplayNamesElement, string> {
  protected static override providerElementName = 'intl-displaynames';

  get #data(): string {
    return this.getDataValue()[0] ?? '';
  }

  #value: string = '';

  /** @readonly */
  override get value(): string {
    return this.#value;
  }

  override render() {
    if (this.#data && this.providerElement) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.providerElement.resolvedOptions().type === 'region' ?
          this.#data.toUpperCase() : this.#data;

      try {
        this.#value = this.providerElement.intlObject.of(of) ?? '';
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
