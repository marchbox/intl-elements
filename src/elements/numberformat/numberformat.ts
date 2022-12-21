import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from '../abstract-provider.js';

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

  @property({attribute: 'option-style'})
  optionStyle: Intl.NumberFormatOptions['style'] = 'decimal';

  @property({attribute: 'option-compactdisplay'})
  optionCompactDisplay: Intl.NumberFormatOptions['compactDisplay'] = 'short';

  @property({attribute: 'option-currency'})
  optionCurrency?: Intl.NumberFormatOptions['currency'];

  @property({attribute: 'option-currencydisplay'})
  optionCurrencyDisplay: Intl.NumberFormatOptions['currencyDisplay'] = 'symbol';

  @property({attribute: 'option-currencysign'})
  optionCurrencySign: Intl.NumberFormatOptions['currencySign'] = 'standard';

  @property({attribute: 'option-notation'})
  optionNotation: Intl.NumberFormatOptions['notation'] = 'standard';

  // @property({attribute: 'option-numberingsystem'})
  // optionNumberingSystem?: Intl.NumberFormatOptions['numberingSystem'];

  @property({attribute: 'option-signdisplay'})
  optionSignDisplay: Intl.NumberFormatOptions['signDisplay'] = 'auto';

  @property({attribute: 'option-unit'})
  optionUnit?: Intl.NumberFormatOptions['unit'];

  @property({attribute: 'option-unitdisplay'})
  optionUnitDisplay: Intl.NumberFormatOptions['unitDisplay'] = 'short';

  @property({attribute: 'option-usegrouping', type: Boolean})
  optionUseGrouping?: Intl.NumberFormatOptions['useGrouping'];

  @property({attribute: 'option-minimumintegerdigits', type: Number})
  optionMinimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits'];

  @property({attribute: 'option-minimumfractiondigits', type: Number})
  optionMinimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];

  @property({attribute: 'option-maximumfractiondigits', type: Number})
  optionMaximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits'];

  @property({attribute: 'option-minimumsignificantdigits', type: Number})
  optionMinimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits'];

  @property({attribute: 'option-maximumsignificantdigits', type: Number})
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
