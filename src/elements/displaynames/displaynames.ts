import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)
 *
 * `intl-displaynames` elements are used to create display names of language
 * names, region/country names, script names, calendar names, etc. Use `<data>`
 * elements with `value` attributes to pass the codes to get display names.
 *
 * @example Display language names:
 * ```html
 * <intl-displaynames locales="en" option-type="language">
 *   <ul>
 *     <li>
 *       <intl-displaynames-of>
 *         <data value="ar-EG">Arabic (Egypt)</data>
 *       </intl-displaynames-of>
 *     </li>
 *     <li>
 *       <intl-displaynames-of>
 *         <data value="zh-Hant">Traditional Chinese</data>
 *       </intl-displaynames-of>
 *     </li>
 *     <li>
 *       <intl-displaynames-of>
 *         <data value="de">German</data>
 *       </intl-displaynames-of>
 *     </li>
 *   </ul>
 * </intl-displaynames>
 * ```
 *
 * @example Display date time field names:
 * ```html
 * <intl-displaynames locales="ja" option-type="datetimefield">
 *   <label>
 *     <intl-displaynames-of>
 *       <data value="year">Year</data>
 *     </intl-displaynames-of>
 *     <input name="year">
 *   </label>
 *   <label>
 *     <intl-displaynames-of>
 *       <data value="month">Month</data>
 *     </intl-displaynames-of>
 *     <input name="month">
 *   </label>
 *   <label>
 *     <intl-displaynames-of>
 *       <data value="day">Day</data>
 *     </intl-displaynames-of>
 *     <input name="day">
 *   </label>
 * </intl-displaynames>
 * ```
 *
 * @intl Intl.DisplayNames()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames
 * @intlprovider
 *
 * @element intl-displaynames
 */
export default class HTMLIntlDisplayNamesElement extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-displaynames-of',
  ]);

  protected static override intlApi = Intl.DisplayNames;

  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  #intlObject!: Intl.DisplayNames;

  /** @readonly */
  get intlObject(): Intl.DisplayNames {
    return this.#intlObject;
  }

  @optionProperty()
  optionType!: Intl.DisplayNamesOptions['type'];

  @optionProperty()
  optionStyle?: Intl.DisplayNamesOptions['style'];

  @optionProperty()
  optionLanguageDisplay?: Intl.DisplayNamesOptions['languageDisplay'];

  @optionProperty()
  optionFallback?: Intl.DisplayNamesOptions['fallback'];

  /**
   * @intl Intl.DisplayNames.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
    try {
      this.#intlObject = new Intl.DisplayNames(
        Array.from(this.localeList.values()),
        {
          type: this.optionType,
          style: this.optionStyle,
          localeMatcher: this.optionLocaleMatcher,
          languageDisplay: this.optionLanguageDisplay,
          fallback: this.optionFallback,
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
