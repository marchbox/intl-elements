import {generateContent} from '../../utils/templates.js';
import AbstractNumberFormatConsumer from './abstract-numberformat-consumer.js';

/**
 * @intl Intl.NumberFormat.prototype.formatToParts
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts
 * @intlconsumer
 *
 * @element intl-numberformat-formattoparts
 *
 * @slot - The slotted element must be a `<data>` element with a `value`
 *    attribute. The value is used as the `number` argument of
 *    `Intl.NumberFormat`’s `formatToParts()` method.
 *
 * @csspart value - The `<span>` element that contains the elements that contain
 *     formatted parts of the given number.
 * @csspart literal - A `<span>` element that contains the string of a
 *     formatted part which `type` is `literal`.
 * @csspart compact - A `<span>` element that contains the string of the
 *     formatted part which `type` is `compact`.
 * @csspart currency - A `<span>` element that contains the string of the
 *     formatted part which `type` is `currency`.
 * @csspart decimal - A `<span>` element that contains the string of the
 *     formatted part which `type` is `decimal`.
 * @csspart exponent-integer - A `<span>` element that contains the string of
 *     the formatted part which `type` is `exponentInteger`.
 * @csspart exponent-minusSign - A `<span>` element that contains the string of
 *     the formatted part which `type` is `exponentMinusSign`.
 * @csspart exponent-separator - A `<span>` element that contains the string of
 *     the formatted part which `type` is `exponentSeparator`.
 * @csspart fraction - A `<span>` element that contains the string of the
 *     formatted part which `type` is `fraction`.
 * @csspart group - A `<span>` element that contains the string of a formatted
 *     part which `type` is `group`.
 * @csspart infinity - A `<span>` element that contains the string of the
 *     formatted part which `type` is `infinity`.
 * @csspart integer - A `<span>` element that contains the string of a formatted
 *     part which `type` is `integer`.
 * @csspart minus-sign - A `<span>` element that contains the string of the
 *     formatted part which `type` is `minusSign`.
 * @csspart nan - A `<span>` element that contains the string of the formatted
 *     part which `type` is `nan`.
 * @csspart plus-sign - A `<span>` element that contains the string of the
 *     formatted part which `type` is `plusSign`.
 * @csspart percent-sign - A `<span>` element that contains the string of the
 *     formatted part which `type` is `percentSign`.
 * @csspart unit - A `<span>` element that contains the string of the
 *     formatted part which `type` is `unit`.
 * @csspart unknown - A `<span>` element that contains the string of a formatted
 *     part which `type` is `unknown`.
 */
export default class HTMLIntlNumberFormatFormatToPartsElement
    extends AbstractNumberFormatConsumer {
  #value: Intl.NumberFormatPart[] = [];

  /** @readonly */
  get value(): Intl.NumberFormatPart[] {
    return this.#value;
  }

  override render() {
    let stringContent = '';

    if (!isNaN(this.number) && this.providerElement) {
      try {
        this.#value =
            this.providerElement.intlObject.formatToParts(this.number);
        stringContent = this.providerElement.intlObject.format(this.number);
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
