import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 *
 * `intl-numberformat` elements can be used to format numbers with the given
 * style (e.g. currency, percent, unit, etc.) and locale.
 *
 * @example Format a number as currency
 * ```html
 * <intl-numberformat locales="de-CH" option-style="currency"
 *     option-currency="chf">
 *   <intl-numberformat-format>
 *     <data value="1234.56">1,234.56</data>
 *   </intl-numberformat-format>
 * </intl-numberformat>
 * ```
 *
 * @intl Intl.NumberFormat()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 * @intlprovider
 *
 * @element intl-numberformat
 */
export default class HTMLIntlNumberFormatElement extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-numberformat-format',
    'intl-numberformat-formattoparts',
    // 'intl-numberformat-formatrange',
    // 'intl-numberformat-formatrangetoparts',
  ]);

  protected static override intlApi = Intl.NumberFormat;

  #resolvedOptions!: Intl.ResolvedNumberFormatOptions;

  #intlObject!: Intl.NumberFormat;

  /** @readonly */
  get intlObject(): Intl.NumberFormat {
    return this.#intlObject;
  }

  @optionProperty()
  optionStyle: Intl.NumberFormatOptions['style'] = 'decimal';

  @optionProperty()
  optionCompactDisplay: Intl.NumberFormatOptions['compactDisplay'] = 'short';

  @optionProperty()
  optionCurrency?: Intl.NumberFormatOptions['currency'];

  @optionProperty()
  optionCurrencyDisplay: Intl.NumberFormatOptions['currencyDisplay'] = 'symbol';

  @optionProperty()
  optionCurrencySign: Intl.NumberFormatOptions['currencySign'] = 'standard';

  @optionProperty()
  optionNotation: Intl.NumberFormatOptions['notation'] = 'standard';

  // @optionProperty()
  // optionNumberingSystem?: Intl.NumberFormatOptions['numberingSystem'];

  @optionProperty()
  optionSignDisplay: Intl.NumberFormatOptions['signDisplay'] = 'auto';

  @optionProperty()
  optionUnit?: Intl.NumberFormatOptions['unit'];

  @optionProperty()
  optionUnitDisplay: Intl.NumberFormatOptions['unitDisplay'] = 'short';

  @optionProperty({type: Boolean})
  optionUseGrouping?: Intl.NumberFormatOptions['useGrouping'];

  @optionProperty({type: Number})
  optionMinimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits'];

  @optionProperty({ type: Number})
  optionMinimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];

  @optionProperty({type: Number})
  optionMaximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits'];

  @optionProperty({type: Number})
  optionMinimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits'];

  @optionProperty({type: Number})
  optionMaximumSignificantDigits?: Intl.NumberFormatOptions['maximumSignificantDigits'];

  /**
   * @intl Intl.NumberFormat.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedNumberFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.NumberFormat(
        Array.from(this.localeList.values()),
        {
          localeMatcher: this.optionLocaleMatcher,
          style: this.optionStyle,
          compactDisplay: this.optionCompactDisplay,
          currency: this.optionCurrency,
          currencyDisplay: this.optionCurrencyDisplay,
          currencySign: this.optionCurrencySign,
          notation: this.optionNotation,
          // numberingSystem: this.optionNumberingSystem,
          signDisplay: this.optionSignDisplay,
          unit: this.optionUnit,
          unitDisplay: this.optionUnitDisplay,
          useGrouping: this.optionUseGrouping,
          minimumIntegerDigits: this.optionMinimumIntegerDigits,
          minimumFractionDigits: this.optionMinimumFractionDigits,
          maximumFractionDigits: this.optionMaximumFractionDigits,
          minimumSignificantDigits: this.optionMinimumSignificantDigits,
          maximumSignificantDigits: this.optionMaximumSignificantDigits,
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
