import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlProviderElement from '../abstract-intl-provider-element';

export default class extends AbstractIntlProviderElement {
  protected static override displayElementNames = new Set([
    'intl-displaynames-of',
  ]);

  protected static override intlApi = Intl.DisplayNames;

  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  #intlObject!: Intl.DisplayNames;

  get intlObject(): Intl.DisplayNames {
    return this.#intlObject;
  }

  @property({attribute: 'option-type'})
  optionType: Intl.DisplayNamesType = 'language';

  @property({attribute: 'option-style'})
  optionStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute: 'option-languagedisplay'})
  optionLanguageDisplay: Intl.DisplayNamesLanguageDisplay = 'dialect';

  @property({attribute: 'option-fallback'})
  optionFallback: Intl.DisplayNamesFallback = 'code';

  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
    try {
      this.#intlObject = new Intl.DisplayNames(this.localeList.value, {
        type: this.optionType,
        style: this.optionStyle,
        localeMatcher: this.optionLocaleMatcher,
        languageDisplay: this.optionLanguageDisplay,
        fallback: this.optionFallback,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
