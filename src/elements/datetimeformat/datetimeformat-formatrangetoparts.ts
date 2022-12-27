import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

import {camelToKebab} from '../../utils/strings.js';
import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer.js';

/**
 * @intl `Intl.DateTimeFormat#formatRangeToParts`
 * @mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatRangeToParts
 *
 * @element intl-datetimeformat-formatrangetoparts
 *
 * @slot - The slotted elements must be `<time>` elements with valid `datetime`
 *     attributes, and the attribute values must represent dates and
 *     optionally times. Hence, they can only be date strings (`YYYY-MM-DD`) or
 *     local or global date time strings (`YYYY-MM-DDTHH:mm:ss.sssZ`). See more
 *     details in the [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/dateTime).
 *     The first slotted `<time>` element is used as the start date and
 *     the second slotted `<time>` element is used as the end date.
 *     Alternatively, use the `start` and `end` slots, which take higher
 *     precedence over the default slotted elements.
 * @slot start - The start date and time. See the default slot for more details.
 * @slot end - The end date and time. See the default slot for more details.
 *
 * @csspart value - The `<span>` element that contains the elements that contain
 *     formatted parts of the given date and time range.
 * @csspart start-range - A `<span>` element that contains the string of a
 *     formatted part which `source` is `startRange`.
 * @csspart end-range - A `<span>` element that contains the string of a
 *     formatted part which `source` is `endRange`.
 * @csspart shared - A `<span>` elements that contains the strings of a
 *     formatted part which `source` are `shared`.
 * @csspart literal - A `<span>` element that contains the string of a formatted
 *     part which `type` is `literal`.
 * @csspart era - A `<span>` element that contains the string of a formatted
 *     part which `type` is `era`.
 * @csspart year - A `<span>` element that contains the string of a formatted
 *    part which `type` is `year`.
 * @csspart year-name - A `<span>` element that contains the string of a
 *     formatted part which `type` is `yearName`.
 * @csspart related-year - A `<span>` element that contains the string of a
 *     formatted part which `type` is `relatedYear`.
 * @csspart month - A `<span>` element that contains the string of a formatted
 *     part which `type` is `month`.
 * @csspart day - A `<span>` element that contains the string of a formatted
 *    part which `type` is `day`.
 * @csspart weekday - A `<span>` element that contains the string of a
 *    formatted part which `type` is `weekday`.
 * @csspart hour - A `<span>` element that contains the string of a formatted
 *    part which `type` is `hour`.
 * @csspart minute - A `<span>` element that contains the string of a
 *    formatted part which `type` is `minute`.
 * @csspart second - A `<span>` element that contains the string of a
 *    formatted part which `type` is `second`.
 * @csspart fractional-second - A `<span>` element that contains the string of
 *    a formatted part which `type` is `fractionalSecond`.
 * @csspart day-period - A `<span>` element that contains the string of a
 *    formatted part which `type` is `dayPeriod`.
 * @csspart time-zone-name - A `<span>` element that contains the string of a
 *    formatted part which `type` is `timeZoneName`.
 */
export default class HTMLIntlDateTimeFormatFormatRangeToPartsElement
    extends AbstractDateTimeFormatConsumer {
  #value: Intl.DateTimeFormatPart[] = [];

  /** @readonly */
  get value(): Intl.DateTimeFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.start && this.end && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject
            .formatRangeToParts(this.start, this.end);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >
        ${map(this.#value, part =>
            html`<span part=${[
              camelToKebab(part.type),
              camelToKebab(part.source),
            ].join(' ')}
                role="none">${part.value}</span>`)}
      </span>
      <span aria-hidden="true" hidden>
        <slot></slot>
        <slot name="start"></slot>
        <slot name="end"></slot>
      </span>
    `;
  }
}
