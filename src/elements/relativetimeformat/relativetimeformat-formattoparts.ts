import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

import {generateSlotContent} from '../../utils/templates.js';
import {camelToKebab} from '../../utils/strings.js';
import HTMLIntlRelativeTimeFormatConsumerElement from './abstract-relativetimeformat-consumer.js';

/**
 * @intl Intl.RelativeTimeFormat.prototype.formatToParts
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts
 * @intlconsumer
 *
 * @element intl-relativetimeformat-formattoparts
 *
 * @slot - The slotted elements must be `<data>` elements with `value`
 *     attributes, the first slotted `<data>` element’s `value` must be a
 *     number that represents the relative time, the second slotted `<data>`
 *     element’s `value` must be a string that represents the unit, and it must
 *     be one of the supported unit. See more details in the
 *     [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format).
 *     Alternatively, use the `rtime` and `unit` slots, which take higher
 *     precedence over the default slotted elements.
 * @slot rtime - The relative time. See the default slot for more details.
 * @slot unit - The unit. See the default slot for more details.
 *
 * @csspart value - The `<span>` element that contains the elements that contain
 *     formatted parts of the given relative time and unit.
 * @csspart literal - A `<span>` element that contains the string of a formatted
 *     part which `type` is `literal`.
 * @csspart integer - The `<span>` element that contains the string of the
 *     formatted part which `type` is `integer`.
 */
export default class HTMLIntlRelativeTimeFormatFormatToPartsElement
    extends HTMLIntlRelativeTimeFormatConsumerElement {
  #value: Intl.RelativeTimeFormatPart[] = [];

  /** @readonly */
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
      ${generateSlotContent([
        '',
        'rtime',
        'unit',
      ])}
    `;
  }
}
