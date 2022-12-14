import {generateContent} from '../../utils/templates.js';
import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer.js';

/**
 * @intl Intl.DateTimeFormat.prototype.formatToParts
 * @intlsee https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
 * @intlconsumer
 *
 * @element intl-datetimeformat-formattoparts
 * 
 * @slot - The slotted element must be a `<time>` element with a valid
 *     `datetime` attribute, and the attribute value must represent a date and
 *     optionally a time. Hence, it can only be a date string (`YYYY-MM-DD`) or
 *     a local or global date time string (`YYYY-MM-DDTHH:mm:ss.sssZ`). See more
 *     details in the [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/dateTime).
 *
 * @csspart value - The `<span>` element that contains the elements that contain
 *     formatted parts of the given date and time.
 * @csspart literal - A `<span>` element that contains the string of the
 *     formatted part which `type` is `literal`.
 * @csspart era - The `<span>` element that contains the string of the formatted
 *     part which `type` is `era`.
 * @csspart year - The `<span>` element that contains the string of the
 *     formatted part which `type` is `year`.
 * @csspart year-name - The `<span>` element that contains the string of the
 *    formatted part which `type` is `yearName`.
 * @csspart related-year - The `<span>` element that contains the string of the
 *    formatted part which `type` is `relatedYear`.
 * @csspart month - The `<span>` element that contains the string of the
 *    formatted part which `type` is `month`.
 * @csspart day - The `<span>` element that contains the string of the
 *    formatted part which `type` is `day`.
 * @csspart weekday - The `<span>` element that contains the string of the
 *    formatted part which `type` is `weekday`.
 * @csspart hour - The `<span>` element that contains the string of the
 *    formatted part which `type` is `hour`.
 * @csspart minute - The `<span>` element that contains the string of the
 *    formatted part which `type` is `minute`.
 * @csspart second - The `<span>` element that contains the string of the
 *    formatted part which `type` is `second`.
 * @csspart fractional-second - The `<span>` element that contains the string of
 *    the formatted part which `type` is `fractionalSecond`.
 * @csspart day-period - The `<span>` element that contains the string of the
 *    formatted part which `type` is `dayPeriod`.
 * @csspart time-zone-name - The `<span>` element that contains the string of
 *    the formatted part which `type` is `timeZoneName`.
 */
export default class HTMLIntlDateTimeFormatFormatToPartsElement
    extends AbstractDateTimeFormatConsumer {
  #value: Intl.DateTimeFormatPart[] = [];

  /** @readonly */
  get value(): Intl.DateTimeFormatPart[] {
    return this.#value;
  }

  override render() {
    let stringContent = '';

    if (this.dateTime && this.providerElement) {
      try {
        this.#value =
            this.providerElement.intlObject.formatToParts(this.dateTime);
        stringContent = this.providerElement.intlObject.format(this.dateTime);
      } catch {}
    }

    return generateContent({
      stringContent,
      partsContent: this.#value,
      lang: this.currentLang,
      dir: this.currentDir,
      slots: [''],
    });
  }
}
