import HTMLIntlListFormatElement from './listformat';

declare global {
  interface HTMLElementTagNameMap {
    'intl-listformat': HTMLIntlListFormatElement;
    // 'intl-listformat-format': HTMLIntlListFormatFormatElement;
  }
}

export function defineIntlListFormatElements() {
  customElements.define('intl-listformat', HTMLIntlListFormatElement);
  // customElements.define('intl-listformat-format', HTMLIntlListFormatFormatElement);
}

export {
  HTMLIntlListFormatElement,
  // HTMLIntlListFormatFormatElement,
}
