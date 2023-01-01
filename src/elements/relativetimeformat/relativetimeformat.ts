import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
 *
 * `intl-relativetimeformat` elements can be used to format relative dates and
 * times with language-sensitivity. You can format both past and future dates
 * and times. The `<intl-relativetimeformat-format>` and
 * `<intl-relativetimeformat-formattoparts>` elements require 2 slots for the
 * relative time and the unit of time. You can either use named slots (`rtime`
 * and `unit`) or unnamed slots (first and second `<data>` elements).
 *
 * @example Format a past time
 * ```html
 * <intl-relativetimeformat locales="pt-BR" option-style="long">
 *   <p>
 *     <intl-relativetimeformat-format>
 *       <data slot="rtime" value="-1">1</data>
 *       <data slot="unit" value="day">day</data>
 *       ago
 *     </intl-relativetimeformat-format>
 *   </p>
 * </intl-relativetimeformat>
 * ```
 *
 * @example Format a future time
 * ```html
 * <intl-relativetimeformat locales="is" option-style="long">
 *   <p>
 *     <intl-relativetimeformat-format>
 *       in
 *       <data value="10">10</data>
 *       <data value="years">years</data>
 *     </intl-relativetimeformat-format>
 *   </p>
 * </intl-relativetimeformat>
 * ```
 *
 * @intl Intl.RelativeTimeFormat()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat
 * @intlprovider"
 *
 * @element intl-relativetimeformat
 */
export default class HTMLIntlRelativeTimeFormatElement
    extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-relativetimeformat-format',
    'intl-relativetimeformat-formattoparts',
  ]);

  protected static override intlApi = Intl.RelativeTimeFormat;

  #resolvedOptions!: Intl.ResolvedRelativeTimeFormatOptions;

  #intlObject!: Intl.RelativeTimeFormat;

  /** @readonly */
  get intlObject(): Intl.RelativeTimeFormat {
    return this.#intlObject;
  }

  @optionProperty()
  optionStyle?: Intl.RelativeTimeFormatOptions['style'];

  @optionProperty()
  optionNumeric?: Intl.RelativeTimeFormatOptions['numeric'];

  /**
   * @intl Intl.RelativeTimeFormat.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedRelativeTimeFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.RelativeTimeFormat(
        this.normalizedLocaleList,
        {
          localeMatcher: this.optionLocaleMatcher,
          numeric: this.optionNumeric,
          style: this.optionStyle,
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
