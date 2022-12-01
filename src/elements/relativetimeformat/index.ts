import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

declare global {
  interface HTMLElementTagNameMap {
    'intl-relativetimeformat': HTMLIntlRelativeTimeFormatElement;
    // 'intl-relativetimeformat-format': HTMLIntlRelativeFormatFormatElement;
    // 'intl-relativetimeformat-formatrange': HTMLIntlRelativeFormatFormatRangeElement;
  }
}

export function defineIntlRelativeTimeFormatElements() {
  customElements.define('intl-relativetimeformat', HTMLIntlRelativeTimeFormatElement);
  // customElements.define('intl-relativetimeformat-format', HTMLIntlRelativeTimeFormatFormatElement);
  // customElements.define('intl-relativetimeformat-formatrange', HTMLIntlRelativeTimeFormatFormatRangeElement);
}

export {
  HTMLIntlRelativeTimeFormatElement,
  // HTMLIntlRelativeTimeFormatFormatElement,
  // HTMLIntlRelativeTimeFormatFormatRangeElement,
}

