import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

export default class extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-collator-compare',
  ]);

  protected static override intlApi = Intl.Collator;

  #resolvedOptions!: Intl.ResolvedCollatorOptions;

  #intlObject!: Intl.Collator;

  get intlObject(): Intl.Collator {
    return this.#intlObject;
  }

  @optionProperty()
  optionUsage?: Intl.CollatorOptions['usage'];

  @optionProperty()
  optionSensitivity?: Intl.CollatorOptions['sensitivity'];

  @optionProperty({attribute: 'option-ignorepunctuation', type: Boolean})
  optionIgnorePunctuation?: Intl.CollatorOptions['ignorePunctuation'];

  @optionProperty({attribute: 'option-numeric', type: Boolean})
  optionNumeric?: Intl.CollatorOptions['numeric'];

  @optionProperty()
  optionCaseFirst?: Intl.CollatorOptions['caseFirst'];

  @optionProperty()
  optionCollation?: Intl.CollatorOptions['collation'];

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
