import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)
 *
 * `intl-listformat` elements can be used to format multiple strings (usually
 * words) with language-sensitivity. For example: “one, two, and three” in
 * English, or “uno, dos o tres” in Spanish. You can use `<data>` element’s
 * `value` attribute to specify the list of strings to format.
 *
 * @example Format a list
 * ```html
 * <intl-listformat locales="es" option-type="disjunction">
 *   <intl-listformat-format>
 *     <data value="uno">uno</data>
 *     <data value="dos">dos</data>
 *     <data value="tres">tres</data>
 *   </intl-listformat-format>
 * </intl-listformat>
 * ```
 *
 * @example Format a list to parts
 * ```html
 * <style>
 * .list::part(element) { font-weight: 700; }
 * .list::part(literal) { color: gray; }
 * </style>
 * <intl-listformat locales="es" option-type="disjunction">
 *   <intl-listformat-formattoparts class="list">
 *     <data value="uno">uno</data>
 *     <data value="dos">dos</data>
 *     <data value="tres">tres</data>
 *   </intl-listformat-formattoparts>
 * </intl-listformat>
 * ```
 *
 * @intl Intl.ListFormat()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
 * @intlprovider
 *
 * @element intl-listformat
 */
export default class HTMLIntlListFormatElement extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-listformat-format',
    'intl-listformat-formattoparts',
  ]);

  protected static override intlApi = Intl.ListFormat;

  #resolvedOptions!: Intl.ResolvedListFormatOptions;

  #intlObject!: Intl.ListFormat;

  /** @readonly */
  get intlObject(): Intl.ListFormat {
    return this.#intlObject;
  }

  @optionProperty()
  optionStyle: Intl.ListFormatOptions['style'] = 'long';
  
  @optionProperty()
  optionType: Intl.ListFormatOptions['type'] = 'conjunction';

  /**
   * @intl Intl.ListFormat.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedListFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.ListFormat(
        this.normalizedLocaleList,
        {
          type: this.optionType,
          style: this.optionStyle,
          localeMatcher: this.optionLocaleMatcher,
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
