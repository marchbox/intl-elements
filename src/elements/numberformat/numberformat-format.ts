import {generateContent} from '../../utils/templates.js';
import AbstractNumberFormatConsumer from './abstract-numberformat-consumer.js';

/**
 * @intl Intl.NumberFormat.prototype.format
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format
 * @intlconsumer
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

    return generateContent({
      stringContent: this.#value,
      lang: this.currentLang,
      dir: this.currentDir,
      slots: [''],
    });
  }
}
