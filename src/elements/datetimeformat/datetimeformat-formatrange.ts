import {html, nothing} from 'lit';

import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer.js';

/**
 * @intl Intl.DateTimeFormat.prototype.formatRange
 * @intlsee https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatRange
 *
 * @element intl-datetimeformat-formatrange
 *
 * @slot - The slotted elements must be `<time>` elements with valid `datetime`
 *     attributes, and the attribute values must represent dates and
 *     optionally times. Hence, they can only be date strings (`YYYY-MM-DD`) or
 *     local or global date time strings (`YYYY-MM-DDTHH:mm:ss.sssZ`). See more
 *     details in the [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/dateTime).
 *     The first slotted `<time>` element would be used as the start date and
 *     the second slotted `<time>` element would be used as the end date.
 *     Alternatively, use the `start` and `end` slots, which take higher
 *     precedence over the default slotted elements.
 * @slot start - The start date and time. See the default slot for more details.
 * @slot end - The end date and time. See the default slot for more details.
 *
 * @csspart value - The `<span>` element that contains the string of the
 *     formatted date and time range.
 */
export default class HTMLIntlDateTimeFormatFormatRangeElement
    extends AbstractDateTimeFormatConsumer {
  #value: string = '';

  /** @readonly */
  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.start && this.end && this.providerElement) {
      try {
        this.#value =
            this.providerElement.intlObject.formatRange(this.start, this.end);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${this.#value}</span>
      <span aria-hidden="true" hidden>
        <slot></slot>
        <slot name="start"></slot>
        <slot name="end"></slot>
      </span>
    `;
  }
}
