import HTMLIntlRelativeTimeFormatElement from './relativetimeformat.js';
import HTMLIntlRelativeTimeFormatFormatElement from './relativetimeformat-format.js';
import HTMLIntlRelativeTimeFormatFormatToPartsElement from './relativetimeformat-formattoparts.js';

declare global {
  interface HTMLElementTagNameMap {
    'intl-relativetimeformat': HTMLIntlRelativeTimeFormatElement;
    'intl-relativetimeformat-format': HTMLIntlRelativeTimeFormatFormatElement;
    'intl-relativetimeformat-formattoparts': HTMLIntlRelativeTimeFormatFormatToPartsElement;
  }
}

export function defineIntlRelativeTimeFormatElements() {
  customElements.define('intl-relativetimeformat', HTMLIntlRelativeTimeFormatElement);
  customElements.define('intl-relativetimeformat-format', HTMLIntlRelativeTimeFormatFormatElement);
  customElements.define('intl-relativetimeformat-formattoparts', HTMLIntlRelativeTimeFormatFormatToPartsElement);
}

export {
  HTMLIntlRelativeTimeFormatElement,
  HTMLIntlRelativeTimeFormatFormatElement,
  HTMLIntlRelativeTimeFormatFormatToPartsElement,
}

