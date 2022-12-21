import HTMLIntlNumberFormatElement from './numberformat.js';
import HTMLIntlNumberFormatFormatElement from './numberformat-format.js';
import HTMLIntlNumberFormatFormatToPartsElement from './numberformat-formattoparts.js';
// import HTMLIntlNumberFormatFormatRangeElement from './numberformat-formatrange.js';
// import HTMLIntlNumberFormatFormatRangeToPartsElement from './numberformat-formatrangetoparts.js';

declare global {
  interface HTMLElementTagNameMap {
    'intl-numberformat': HTMLIntlNumberFormatElement;
    'intl-numberformat-format': HTMLIntlNumberFormatFormatElement;
    'intl-numberformat-formattoparts': HTMLIntlNumberFormatFormatToPartsElement;
    // 'intl-numberformat-formatrange': HTMLIntlNumberFormatFormatRangeElement;
    // 'intl-numberformat-formatrangetoparts': HTMLIntlNumberFormatFormatRangeToPartsElement;
  }
}

export function defineIntlNumberFormatElements() {
  customElements.define('intl-numberformat', HTMLIntlNumberFormatElement);
  customElements.define('intl-numberformat-format', HTMLIntlNumberFormatFormatElement);
  customElements.define('intl-numberformat-formattoparts', HTMLIntlNumberFormatFormatToPartsElement);
  // customElements.define('intl-numberformat-formatrange', HTMLIntlNumberFormatFormatRangeElement);
  // customElements.define('intl-numberformat-formatrangetoparts', HTMLIntlNumberFormatFormatRangeToPartsElement);
}

export {
  HTMLIntlNumberFormatElement,
  HTMLIntlNumberFormatFormatElement,
  HTMLIntlNumberFormatFormatToPartsElement,
  // HTMLIntlNumberFormatFormatRangeElement,
  // HTMLIntlNumberFormatFormatRangeToPartsElement,
}
