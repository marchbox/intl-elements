import HTMLIntlDateTimeFormatElement from './datetimeformat.js';
import HTMLIntlDateTimeFormatFormatElement from './datetimeformat-format.js';
import HTMLIntlDateTimeFormatFormatToPartsElement from './datetimeformat-formattoparts.js';
import HTMLIntlDateTimeFormatFormatRangeElement from './datetimeformat-formatrange.js';
import HTMLIntlDateTimeFormatFormatRangeToPartsElement from './datetimeformat-formatrangetoparts.js';

declare global {
  interface HTMLElementTagNameMap {
    'intl-datetimeformat': HTMLIntlDateTimeFormatElement;
    'intl-datetimeformat-format': HTMLIntlDateTimeFormatFormatElement;
    'intl-datetimeformat-formattoparts': HTMLIntlDateTimeFormatFormatToPartsElement;
    'intl-datetimeformat-formatrange': HTMLIntlDateTimeFormatFormatRangeElement;
    'intl-datetimeformat-formatrangetoparts': HTMLIntlDateTimeFormatFormatRangeToPartsElement;
  }
}

export function defineIntlDateTimeFormatElements() {
  customElements.define('intl-datetimeformat', HTMLIntlDateTimeFormatElement);
  customElements.define('intl-datetimeformat-format', HTMLIntlDateTimeFormatFormatElement);
  customElements.define('intl-datetimeformat-formattoparts', HTMLIntlDateTimeFormatFormatToPartsElement);
  customElements.define('intl-datetimeformat-formatrange', HTMLIntlDateTimeFormatFormatRangeElement);
  customElements.define('intl-datetimeformat-formatrangetoparts', HTMLIntlDateTimeFormatFormatRangeToPartsElement);
}

export {
  HTMLIntlDateTimeFormatElement,
  HTMLIntlDateTimeFormatFormatElement,
  HTMLIntlDateTimeFormatFormatToPartsElement,
  HTMLIntlDateTimeFormatFormatRangeElement,
  HTMLIntlDateTimeFormatFormatRangeToPartsElement,
}
