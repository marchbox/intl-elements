import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from '../abstract-provider.js';

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

  @property({attribute: 'option-usage'})
  optionUsage?: Intl.CollatorOptions['usage'];

  @property({attribute: 'option-sensitivity'})
  optionSensitivity?: Intl.CollatorOptions['sensitivity'];

  @property({attribute: 'option-ignorepunctuation', type: Boolean})
  optionIgnorePunctuation?: Intl.CollatorOptions['ignorePunctuation'];

  @property({attribute: 'option-numeric', type: Boolean})
  optionNumeric?: Intl.CollatorOptions['numeric'];

  @property({attribute: 'option-casefirst'})
  optionCaseFirst?: Intl.CollatorOptions['caseFirst'];

  @property({attribute: 'option-collation'})
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
