import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from '../abstract-provider.js';

export default class extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-displaynames-of',
  ]);

  protected static override intlApi = Intl.DisplayNames;

  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  #intlObject!: Intl.DisplayNames;

  get intlObject(): Intl.DisplayNames {
    return this.#intlObject;
  }

  @property({attribute: 'option-type'})
  optionType: Intl.DisplayNamesOptions['type'] = 'language';

  @property({attribute: 'option-style'})
  optionStyle: Intl.DisplayNamesOptions['style'] = 'long';

  @property({attribute: 'option-languagedisplay'})
  optionLanguageDisplay: Intl.DisplayNamesOptions['languageDisplay'] = 'dialect';

  @property({attribute: 'option-fallback'})
  optionFallback: Intl.DisplayNamesOptions['fallback'] = 'code';

  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
    try {
      this.#intlObject = new Intl.DisplayNames(this.localeList.valueAsArray, {
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
