import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlProviderElement from '../abstract-intl-provider-element';

export default class extends AbstractIntlProviderElement {
  protected static override consumerElementNames = new Set([
    'intl-numberformat-format',
    'intl-numberformat-formattoparts',
    'intl-numberformat-formatrange',
    'intl-numberformat-formatrangetoparts',
  ]);

  protected static override intlApi = Intl.NumberFormat;

  #resolvedOptions!: Intl.ResolvedNumberFormatOptions;

  #intlObject!: Intl.NumberFormat;

  get intlObject(): Intl.NumberFormat {
    return this.#intlObject;
  }

  @property({attribute: 'option-style'})
  optionStyle: 'decimal' | 'currency' | 'percent' | 'unit' = 'decimal';

  @property({attribute: 'option-compactdisplay'})
  optionCompactDisplay: 'short' | 'long' = 'short';

  @property({attribute: 'option-currency'})
  optionCurrency?: string;

  @property({attribute: 'option-currencydisplay'})
  optionCurrencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol';

  @property({attribute: 'option-currencysign'})
  optionCurrencySign: 'standard' | 'accounting' = 'standard';

  @property({attribute: 'option-notation'})
  optionNotation: 'standard' | 'scientific' | 'engineering' | 'compact' = 'standard';

  @property({attribute: 'option-numberingsystem'})
  optionNumberingSystem?: IntlNumberingSystem;

  @property({attribute: 'option-signdisplay'})
  optionSignDisplay: 'auto' | 'always' | 'exceptZero' | 'never' = 'auto';

  @property({attribute: 'option-unit'})
  optionUnit?: string;

  @property({attribute: 'option-unitdisplay'})
  optionUnitDisplay: 'short' | 'long' | 'narrow' = 'short';

  @property({attribute: 'option-usegrouping', type: Boolean})
  optionUseGrouping?: boolean;

  @property({attribute: 'option-minimumintegerdigits', type: Number})
  optionMinimumIntegerDigits?: number;

  @property({attribute: 'option-minimumfractiondigits', type: Number})
  optionMinimumFractionDigits?: number;

  @property({attribute: 'option-maximumfractiondigits', type: Number})
  optionMaximumFractionDigits?: number;

  @property({attribute: 'option-minimumsignificantdigits', type: Number})
  optionMinimumSignificantDigits?: number;

  @property({attribute: 'option-maximumsignificantdigits', type: Number})
  optionMaximumSignificantDigits?: number;

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
        // @ts-ignore
        numberingSystem: this.optionNumberingSystem,
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
