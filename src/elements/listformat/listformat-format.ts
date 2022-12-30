import {generateContent} from '../../utils/templates.js';
import AbstractListFormatConsumer from './abstract-listformat-consumer.js';

/**
 * @intl Intl.ListFormat.prototype.format
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format
 * @intlconsumer
 *
 * @element intl-listformat-format
 *
 * @slot - One or multiple `<data>` elements with `value` attributes. An array
 *     is created based on the values and used as the `list` argument of
 *    `Intl.ListFormat`’s `format()` method.
 *
 * @csspart value - The `<span>` element that contains the string of the
 *     formatted list.
 */
export default class HTMLIntlListFormatFormatElement
    extends AbstractListFormatConsumer {
  #value: string = '';

  /** @readonly */
  override get value(): string {
    return this.#value;
  }

  override render() {
    if (this.list && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.list);
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
