import HTMLIntlLocaleElement from './locale.js';

declare global {
  interface HTMLElementTagNameMap {
    'intl-locale': HTMLIntlLocaleElement;
  }
}

export function defineIntlLocaleElements() {
  customElements.define('intl-locale', HTMLIntlLocaleElement);
}

export {
  HTMLIntlLocaleElement,
}
