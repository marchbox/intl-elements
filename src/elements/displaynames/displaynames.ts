import {property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  #value = '';

  protected intlObj = Intl.DisplayNames;

  @property({attribute: 'of-code', reflect: true})
  ofCode = '';

  @property({attribute: 'option-type'})
  optionType: Intl.DisplayNamesType = 'language';

  @property({attribute: 'option-style'})
  optionStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute: 'option-languagedisplay'})
  optionLanguageDisplay: Intl.DisplayNamesLanguageDisplay = 'dialect';

  @property({attribute: 'option-fallback'})
  optionFallback: Intl.DisplayNamesFallback = 'code';

  get value(): string {
    return this.#value;
  }

  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
    if (this.locales && this.ofCode) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.optionType === 'region' ?
          this.ofCode.toUpperCase() : this.ofCode;

      try {
        const dn = new Intl.DisplayNames(this.localeList, {
          type: this.optionType,
          style: this.optionStyle,
          localeMatcher: this.optionLocaleMatcher,
          languageDisplay: this.optionLanguageDisplay,
          fallback: this.optionFallback,
        });
        this.#resolvedOptions = dn.resolvedOptions();
        this.#value = dn.of(of) as string;
      } catch {}
    }

    return this.#value;
  }
}
