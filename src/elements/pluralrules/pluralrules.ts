import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @intl Intl.PluralRules
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules
 * @intlprovider
 *
 * @element intl-pluralrules
 */
export default class HTMLIntlPluralRulesElement extends AbstractProvider {
  protected static override intlApi = Intl.PluralRules;

  protected static override consumerElementNames = new Set([
    'intl-pluralrules-select',
    // 'intl-pluralrules-selectRange',
  ]);

  #resolvedOptions!: Intl.ResolvedPluralRulesOptions;

  #intlObject!: Intl.PluralRules;

  /** @readonly */
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

  /**
   * @intl Intl.PluralRules.prototype.resolvedOptions
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions
   */
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
