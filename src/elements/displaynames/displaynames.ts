import {property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  #value = '';

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

  @property({attribute: false})
  get value(): string {
    return this.#value;
  }

  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
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
        this.#value = dn.of(of) as string;
      } catch {}
    }

    return this.#value;
  }
}
