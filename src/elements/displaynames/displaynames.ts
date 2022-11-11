export default class DisplayNames extends HTMLElement {
  static observedAttributes = [
    'locales',
    'type',
    'intl-style',
    'locale-matcher',
    'language-display',
    'fallback',
    'of',
  ];

  locales!: Intl.LocalesArgument;

  of!: string;

  intlStyle: Intl.RelativeTimeFormatStyle = 'long';

  type: Intl.DisplayNamesType = 'language';

  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  languageDisplay: Intl.DisplayNamesLanguageDisplay = 'dialect';

  fallback: Intl.DisplayNamesFallback = 'code';

  connectedCallback() {
    if (this.hasAttribute('locales')) {
      this.locales = this.getAttribute('locales')!;
    }
    if (this.hasAttribute('of')) {
      this.of = this.getAttribute('of')!;
    }
    if (this.hasAttribute('intl-style')) {
      this.intlStyle = this.getAttribute('intl-style') as Intl.RelativeTimeFormatStyle;
    }
    if (this.hasAttribute('type')) {
      this.type = this.getAttribute('type') as Intl.DisplayNamesType;
    }
    if (this.hasAttribute('locale-matcher')) {
      this.localeMatcher = this.getAttribute('locale-matcher') as Intl.RelativeTimeFormatLocaleMatcher;
    }
    if (this.hasAttribute('language-display')) {
      this.languageDisplay = this.getAttribute('language-display') as Intl.DisplayNamesLanguageDisplay;
    }
    if (this.hasAttribute('fallback')) {
      this.fallback = this.getAttribute('fallback') as Intl.DisplayNamesFallback;
    }

    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    try {
      const result = new Intl.DisplayNames(this.locales, {
        type: this.type,
        style: this.intlStyle,
        localeMatcher: this.localeMatcher,
        languageDisplay: this.languageDisplay,
        fallback: this.fallback,
      }).of(this.of);

      this.textContent = result ?? '';
    } catch {}
  }
}