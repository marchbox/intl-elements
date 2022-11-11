import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('intl-displaynames')
export default class DisplayNames extends LitElement {
  @property()
  locales: Intl.LocalesArgument = '';

  @property()
  of = '';

  @property()
  type: Intl.DisplayNamesType = 'language';

  @property({attribute: 'intl-style'})
  intlStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute: 'locale-matcher'})
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  @property({attribute: 'language-display'})
  languageDisplay: Intl.DisplayNamesLanguageDisplay = 'dialect';

  @property()
  fallback: Intl.DisplayNamesFallback = 'code';

  override createRenderRoot() {
    return this;
  }

  override render() {
    let result = '';

    if (this.locales && this.of) {
      try {
        result = new Intl.DisplayNames(this.locales, {
          type: this.type,
          style: this.intlStyle,
          localeMatcher: this.localeMatcher,
          languageDisplay: this.languageDisplay,
          fallback: this.fallback,
        }).of(this.of) as string;
      } catch {}
    }

    return html`${result}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'intl-displaynames': DisplayNames,
  }
}
