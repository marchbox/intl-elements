import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)
 *
 * `intl-collator` elements can be used for language-sensitive list sorting and
 * filtering, both are done by using the `<intl-collator-compare>` element. The
 * “list” here means the element you assign to the `list` slot, the
 * `textContent` of each direct child element is a string member of the list.
 *
 * The `<intl-collator-compare>` element does NOT modify the author content, it
 * makes a copy of the list element and its descendants, and then sorts or
 * filters the copy inside its Shadow DOM.
 *
 * @example Sorting a list of strings:
 * ```html
 * <intl-collator locales="de-u-co-phonebk">
 *   <intl-collator-compare>
 *     <ol slot="list">
 *       <li>Offenbach</li>
 *       <li>Österreich</li>
 *       <li>Odenwald</li>
 *     </ol>
 *   </intl-collator-compare>
 * </intl-collator>
 * ```
 *
 * @example Filtering a list of strings:
 * ```html
 * <intl-collator locales="fr">
 *   <intl-collator-compare>
 *     <data slot="target" value="congres"></data>
 *     <ul slot="list">
 *       <li>Congrès</li>
 *       <li>congres</li>
 *       <li>Assemblée</li>
 *       <li>poisson</li>
 *     </ul>
 *   </intl-collator-compare>
 * </intl-collator>
 * ```
 *
 * @intl Intl.Collator()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator
 * @intlprovider
 *
 * @element intl-collator
 */
export default class HTMLIntlCollatorElement extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-collator-compare',
  ]);

  protected static override intlApi = Intl.Collator;

  #resolvedOptions!: Intl.ResolvedCollatorOptions;

  #intlObject!: Intl.Collator;

  /** @readonly */
  override get intlObject(): Intl.Collator {
    return this.#intlObject;
  }

  @optionProperty()
  optionUsage?: Intl.CollatorOptions['usage'];

  @optionProperty()
  optionSensitivity?: Intl.CollatorOptions['sensitivity'];

  @optionProperty({type: Boolean})
  optionIgnorePunctuation?: Intl.CollatorOptions['ignorePunctuation'];

  @optionProperty({type: Boolean})
  optionNumeric?: Intl.CollatorOptions['numeric'];

  @optionProperty()
  optionCaseFirst?: Intl.CollatorOptions['caseFirst'];

  @optionProperty()
  optionCollation?: Intl.CollatorOptions['collation'];

  /**
   * @intl Intl.Collator.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedCollatorOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.Collator(
        Array.from(this.localeList.values()),
        {
          localeMatcher: this.optionLocaleMatcher,
          usage: this.optionUsage,
          sensitivity: this.optionSensitivity,
          ignorePunctuation: this.optionIgnorePunctuation,
          numeric: this.optionNumeric,
          caseFirst: this.optionCaseFirst,
          collation: this.optionCollation,
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
