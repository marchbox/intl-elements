import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

import {camelToKebab} from '../../utils/strings.js';
import AbstractListFormatConsumer from './abstract-listformat-consumer.js';

/**
 * @intl Intl.ListFormat.prototype.formatToParts
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/formatToParts
 * @intlconsumer
 *
 * @element intl-listformat-formattoparts
 *
 * @slot - One or multiple `<data>` elements with `value` attributes. An array
 *     is created based on the values and used as the `list` argument of
 *    `Intl.ListFormat`’s `formatToParts()` method.
 *
 * @csspart value - The `<span>` element that contains the elements that contain
 *     formatted parts of the given list.
 * @csspart literal - A `<span>` element that contains the string of the
 *     formatted part which `type` is `literal`.
 * @csspart element - A `<span>` element that contains the string of the
 *     formatted part which `type` is `element`.
 */
export default class HTMLIntlListFormatFormatToPartsElement
    extends AbstractListFormatConsumer {
  #value: Intl.ListFormatPart[] = [];

  /** @readonly */
  override get value(): Intl.ListFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.list && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.formatToParts(this.list);
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
        <slot></slot>
      </span>
    `;
  }
}
