import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';
import HTMLIntlRelativeTimeFormatFormatElement from './relativetimeformat-format';
import HTMLIntlRelativeTimeFormatFormatToPartsElement from './relativetimeformat-formattoparts';

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

