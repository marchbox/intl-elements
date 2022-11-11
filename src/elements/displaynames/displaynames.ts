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

  set locales(value: Intl.LocalesArgument) {
    this.setAttribute('locales', value as string);
  }
  get locales(): Intl.LocalesArgument {
    return this.getAttribute('locales') || undefined;
  }

  set of(value: string) {
    this.setAttribute('of', value);
  }
  get of(): string {
    return this.getAttribute('of') || '';
  }

  set type(value: Intl.DisplayNamesType) {
    this.setAttribute('type', value);
  }
  get type(): Intl.DisplayNamesType {
    return this.getAttribute('type') as Intl.DisplayNamesType || 'language';
  }

  set intlStyle(value: Intl.RelativeTimeFormatStyle) {
    this.setAttribute('intl-style', value);
  }
  get intlStyle(): Intl.RelativeTimeFormatStyle {
    return this.getAttribute('intl-style') as Intl.RelativeTimeFormatStyle || 'long';
  }

  set localeMatcher(value: Intl.RelativeTimeFormatLocaleMatcher) {
    this.setAttribute('locale-matcher', value);
  }
  get localeMatcher(): Intl.RelativeTimeFormatLocaleMatcher {

    return this.getAttribute('locale-matcher') as Intl.RelativeTimeFormatLocaleMatcher || 'best fit';
  }

  set languageDisplay(value: Intl.DisplayNamesLanguageDisplay) {
    this.setAttribute('language-display', value);
  }
  get languageDisplay(): Intl.DisplayNamesLanguageDisplay {
    return this.getAttribute('language-display') as Intl.DisplayNamesLanguageDisplay || 'dialect';
  }

  set fallback(value: Intl.DisplayNamesFallback) {
    this.setAttribute('fallback', value);
  }
  get fallback(): Intl.DisplayNamesFallback {
    return this.getAttribute('fallback') as Intl.DisplayNamesFallback || 'code';
  }

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