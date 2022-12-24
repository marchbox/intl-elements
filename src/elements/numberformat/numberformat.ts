import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

export default class extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-numberformat-format',
    'intl-numberformat-formattoparts',
    // 'intl-numberformat-formatrange',
    // 'intl-numberformat-formatrangetoparts',
  ]);

  protected static override intlApi = Intl.NumberFormat;

  #resolvedOptions!: Intl.ResolvedNumberFormatOptions;

  #intlObject!: Intl.NumberFormat;

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

  @optionProperty({attribute: 'option-usegrouping', type: Boolean})
  optionUseGrouping?: Intl.NumberFormatOptions['useGrouping'];

  @optionProperty({attribute: 'option-minimumintegerdigits', type: Number})
  optionMinimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits'];

  @optionProperty({attribute: 'option-minimumfractiondigits', type: Number})
  optionMinimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];

  @optionProperty({attribute: 'option-maximumfractiondigits', type: Number})
  optionMaximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits'];

  @optionProperty({attribute: 'option-minimumsignificantdigits', type: Number})
  optionMinimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits'];

  @optionProperty({attribute: 'option-maximumsignificantdigits', type: Number})
  optionMaximumSignificantDigits?: Intl.NumberFormatOptions['maximumSignificantDigits'];

  resolvedOptions(): Intl.ResolvedNumberFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.NumberFormat(this.localeList.valueAsArray, {
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
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
