import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

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

  @optionProperty()
  optionType: Intl.PluralRulesOptions['type'] = 'cardinal';

  @optionProperty()
  optionMinimumIntegerDigits?: Intl.PluralRulesOptions['minimumIntegerDigits'];

  @optionProperty()
  optionMinimumFractionDigits?: Intl.PluralRulesOptions['minimumFractionDigits'];

  @optionProperty()
  optionMaximumFractionDigits?: Intl.PluralRulesOptions['maximumFractionDigits'];

  @optionProperty()
  optionMinimumSignificantDigits?: Intl.PluralRulesOptions['minimumSignificantDigits'];

  @optionProperty()
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
