import {html, nothing} from 'lit';

import {generateSlotContent} from '../../utils/templates.js';
import AbstractRelativeTimeFormatConsumer from './abstract-relativetimeformat-consumer.js';

/**
 * @intl Intl.RelativeTimeFormat.prototype.format
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format
 * @intlconsumer
 *
 * @element intl-relativetimeformat-format
 *
 * @slot - The slotted elements must be `<data>` elements with `value`
 *     attributes, the first slotted `<data>` element’s `value` must be a
 *     string of number that represents the relative time, the second slotted
 *     `<data>` element’s `value` must be a string that represents the unit, and
 *     it must be one of the supported unit. See more details in the
 *     [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format).
 *     Alternatively, use the `rtime` and `unit` slots, which take higher
 *     precedence over the default slotted elements.
 * @slot rtime - The relative time. See the default slot for more details.
 * @slot unit - The unit. See the default slot for more details.
 *
 * @csspart value - The `<span>` element that contains the string of the
 *     formatted relative time.
 */
export default class HTMLIntlRelativeTimeFormatFormatElement
    extends AbstractRelativeTimeFormatConsumer {
  #value: string = '';

  /** @readonly */
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
      ${generateSlotContent([
        '',
        'rtime',
        'unit',
      ])}
    `;
  }
}
