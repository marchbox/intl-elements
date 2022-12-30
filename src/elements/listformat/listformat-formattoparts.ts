import {generateContent} from '../../utils/templates.js';
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
    let stringContent = '';

    if (this.list && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.formatToParts(this.list);
        stringContent = this.providerElement.intlObject.format(this.list);
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
