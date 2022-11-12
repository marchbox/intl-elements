import {PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';
import {localesToLocaleList} from '../../utils/locales';

@customElement('intl-displaynames')
export default class DisplayNames extends AbstractIntlElement {
  @property({attribute: false})
  localeList: Intl.BCP47LanguageTag[] = [];

  @property({reflect: true})
  locales: Intl.LocalesArgument = '';

  @property({reflect: true})
  of = '';

  @property({reflect: true})
  type: Intl.DisplayNamesType = 'language';

  @property({attribute: 'intl-style', reflect: true})
  intlStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute: 'locale-matcher', reflect: true})
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  @property({attribute: 'language-display', reflect: true})
  languageDisplay: Intl.DisplayNamesLanguageDisplay = 'dialect';

  @property({reflect: true})
  fallback: Intl.DisplayNamesFallback = 'code';

  protected override willUpdate(changes: PropertyValues<this>) {
    if (changes.has('locales')) {
      this.localeList =
          localesToLocaleList(this.locales as string, this.localeMatcher);
    }
  }

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
