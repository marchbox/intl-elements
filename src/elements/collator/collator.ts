import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @intl Intl.Collator
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
   * @intl Intl.Collator.prototype.resolvedOptions
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedCollatorOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.Collator(this.localeList.valueAsArray, {
        localeMatcher: this.optionLocaleMatcher,
        usage: this.optionUsage,
        sensitivity: this.optionSensitivity,
        ignorePunctuation: this.optionIgnorePunctuation,
        numeric: this.optionNumeric,
        caseFirst: this.optionCaseFirst,
        collation: this.optionCollation,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
