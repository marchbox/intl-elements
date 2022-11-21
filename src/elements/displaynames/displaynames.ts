import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  protected intlObj = Intl.DisplayNames;

  @property({attribute: 'of-code', reflect: true})
  ofCode = '';

  @property({attribute: 'option-type', reflect: true})
  optionType: Intl.DisplayNamesType = 'language';

  @property({attribute: 'option-style', reflect: true})
  optionStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute: 'option-languagedisplay', reflect: true})
  optionLanguageDisplay: Intl.DisplayNamesLanguageDisplay = 'dialect';

  @property({attribute: 'option-fallback', reflect: true})
  optionFallback: Intl.DisplayNamesFallback = 'code';

  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
    let result: unknown = nothing;

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
        result = dn.of(of) as string;
      } catch {}
    }

    return result;
  }
}
