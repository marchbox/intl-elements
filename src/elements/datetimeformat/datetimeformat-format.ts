import {generateContent} from '../../utils/templates.js';
import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer.js';

/**
 * @intl Intl.DateTimeFormat.prototype.format
 * @intlsee https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/format
 * @intlconsumer
 *
 * @element intl-datetimeformat-format
 *
 * @slot - The slotted element must be a `<time>` element with a valid
 *     `datetime` attribute, and the attribute value must represent a date and
 *     optionally a time. Hence, it can only be a date string (`YYYY-MM-DD`) or
 *     a local or global date time string (`YYYY-MM-DDTHH:mm:ss.sssZ`). See more
 *     details in the [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/dateTime).
 *
 * @csspart value - The `<span>` element that contains the string of the
 *     formatted date and time.
 */
export default class HTMLIntlDateTimeFormatFormatElement
    extends AbstractDateTimeFormatConsumer {
  #value: string = '';

  /** @readonly */
  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.dateTime && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.dateTime);
      } catch {}
    }

    return generateContent({
      stringContent: this.#value,
      lang: this.currentLang,
      dir: this.currentDir,
      slots: [''],
    });
  }
}
