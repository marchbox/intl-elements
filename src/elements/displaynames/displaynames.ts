import {customElement, property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

@customElement('intl-displaynames')
export default class DisplayNames extends AbstractIntlElement {
  private _resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

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
    return this._resolvedOptions;
  }

  protected override render() {
    let result = '';

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
        this._resolvedOptions = dn.resolvedOptions();
        result = dn.of(of) as string;
      } catch {}
    }

    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'intl-displaynames': DisplayNames,
  }
}
