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
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const result = new Intl.DisplayNames(this.locales, {
      type: this.type,
      style: this.intlStyle,
      localeMatcher: this.localeMatcher,
      languageDisplay: this.languageDisplay,
      fallback: this.fallback,
    }).of(this.of);

    this.textContent = result ?? '';
  }
}