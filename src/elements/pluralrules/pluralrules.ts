import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
 *
 * `intl-pluralrules` elements can be used to pick the correct plural form for a
 * given number and locale.
 *
 * You can specify these plural forms in `<template>`
 * elements and assign them to the slots that represent pluralization
 * categories. Note that at the minimal, you should specify a `<template>` to
 * use for the `other` category as it is the fallback when the
 * `<intl-pluralrules-select>` element can’t find the `<template>` that is
 * assigned to the slot that represents the selected pluralization category.
 *
 * You can specify the number to be used for pluralization by assigning a
 * `<data>` element to the default slot of the `<intl-pluralrules-select>`.
 *
 * If you need to add the number into the pluralized string, you can use one or
 * multiple `<ins>` elements in the `<template>` elements as placeholders.
 *
 * It also supports both ordinal and cardinal pluralization rules.
 *
 * @example Cardinal pluralization
 * ```html
 * <intl-pluralrules locales="en">
 *   <intl-pluralrules-select>
 *     <data value="10"></data>
 *     <template slot="zero">No notifications</template>
 *     <template slot="one">1 notification</template>
 *     <template slot="other"><ins></ins> notifications</template>
 *   </intl-pluralrules-select>
 * </intl-pluralrules>
 * ```
 *
 * @example Ordinal pluralization
 * ```html
 * <intl-pluralrules locales="en" option-type="ordinal">
 *   <p>
 *     The
 *     <intl-pluralrules-select>
 *       <data value="103"></data>
 *       <template slot="one">1st</template>
 *       <template slot="two">2nd</template>
 *       <template slot="few">3rd</template>
 *       <template slot="other"><ins></ins>th</template>
 *     </intl-pluralrules-select>
 *     time
 *   </p>
 * </intl-pluralrules>
 * ```
 *
 * @intl Intl.PluralRules()
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
  optionType?: Intl.PluralRulesOptions['type'];

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
   * @intl Intl.PluralRules.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedPluralRulesOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.PluralRules(
        this.normalizedLocaleList,
        {
          localeMatcher: this.optionLocaleMatcher,
          type: this.optionType,
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
