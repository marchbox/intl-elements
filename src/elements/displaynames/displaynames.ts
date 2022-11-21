import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  protected intlObj = Intl.DisplayNames;

  @property({reflect: true})
  of = '';

  @property({reflect: true})
  type: Intl.DisplayNamesType = 'language';

  @property({attribute: 'intl-style', reflect: true})
  intlStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute: 'language-display', reflect: true})
  languageDisplay: Intl.DisplayNamesLanguageDisplay = 'dialect';

  @property({reflect: true})
  fallback: Intl.DisplayNamesFallback = 'code';

  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
    let result: unknown = nothing;

    if (this.locales && this.of) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.type === 'region' ? this.of.toUpperCase() : this.of;

      try {
        const dn = new Intl.DisplayNames(this.localeList, {
          type: this.type,
          style: this.intlStyle,
          localeMatcher: this.localeMatcher,
          languageDisplay: this.languageDisplay,
          fallback: this.fallback,
        });
        this.#resolvedOptions = dn.resolvedOptions();
        result = dn.of(of) as string;
      } catch {}
    }

    return result;
  }
}
