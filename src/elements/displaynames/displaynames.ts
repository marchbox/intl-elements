import {customElement, property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

@customElement('intl-displaynames')
export default class DisplayNames extends AbstractIntlElement {
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

  protected override render() {
    let result = '';

    if (this.locales && this.of) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.type === 'region' ? this.of.toUpperCase() : this.of;

      try {
        result = new Intl.DisplayNames(this.localeList, {
          type: this.type,
          style: this.intlStyle,
          localeMatcher: this.localeMatcher,
          languageDisplay: this.languageDisplay,
          fallback: this.fallback,
        }).of(of) as string;
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
