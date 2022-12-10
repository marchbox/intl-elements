import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from '../abstract-provider';

export default class extends AbstractProvider {
  protected static override intlApi = Intl.PluralRules;

  protected static override consumerElementNames = new Set([
    'intl-pluralrules-select',
    // 'intl-pluralrules-selectRange',
  ]);

  #resolvedOptions!: Intl.ResolvedPluralRulesOptions;

  #intlObject!: Intl.PluralRules;

  get intlObject(): Intl.PluralRules {
    return this.#intlObject;
  }

  @property({attribute: 'option-type'})
  optionType: Intl.PluralRulesOptions['type'] = 'cardinal';

  @property({attribute: 'option-minimumintegerdigits'})
  optionMinimumIntegerDigits?: Intl.PluralRulesOptions['minimumIntegerDigits'];

  @property({attribute: 'option-minimumfractiondigits'})
  optionMinimumFractionDigits?: Intl.PluralRulesOptions['minimumFractionDigits'];

  @property({attribute: 'option-maximumfractiondigits'})
  optionMaximumFractionDigits?: Intl.PluralRulesOptions['maximumFractionDigits'];

  @property({attribute: 'option-minimumsignificantdigits'})
  optionMinimumSignificantDigits?: Intl.PluralRulesOptions['minimumSignificantDigits'];

  @property({attribute: 'option-maximumsignificantdigits'})
  optionMaximumSignificantDigits?: Intl.PluralRulesOptions['maximumSignificantDigits'];


  resolvedOptions(): Intl.ResolvedPluralRulesOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.PluralRules(this.localeList.valueAsArray, {
        localeMatcher: this.optionLocaleMatcher,
        type: this.optionType,
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
