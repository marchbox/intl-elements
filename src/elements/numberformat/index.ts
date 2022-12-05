import HTMLIntlNumberFormatElement from './numberformat';
// import HTMLIntlNumberFormatFormatElement from './numberformat-format';
// import HTMLIntlNumberFormatFormatToPartsElement from './numberformat-formattoparts';
// import HTMLIntlNumberFormatFormatRangeElement from './numberformat-formatrange';
// import HTMLIntlNumberFormatFormatRangeToPartsElement from './numberformat-formatrangetoparts';

declare global {
  interface HTMLElementTagNameMap {
    'intl-numberformat': HTMLIntlNumberFormatElement;
    // 'intl-numberformat-format': HTMLIntlNumberFormatFormatElement;
    // 'intl-numberformat-formatrange': HTMLIntlNumberFormatFormatRangeElement;
    // 'intl-numberformat-formattoparts': HTMLIntlNumberFormatFormatToPartsElement;
    // 'intl-numberformat-formatrangetoparts': HTMLIntlNumberFormatFormatRangeToPartsElement;
  }
}

export function defineIntlLocaleElements() {
  customElements.define('intl-numberformat', HTMLIntlNumberFormatElement);
  // customElements.define('intl-numberformat-format', HTMLIntlNumberFormatFormatElement);
  // customElements.define('intl-numberformat-formatrange', HTMLIntlNumberFormatFormatRangeElement);
  // customElements.define('intl-numberformat-formattoparts', HTMLIntlNumberFormatFormatToPartsElement);
  // customElements.define('intl-numberformat-formatrangetoparts', HTMLIntlNumberFormatFormatRangeToPartsElement);
}

export {
  HTMLIntlNumberFormatElement,
  // HTMLIntlNumberFormatFormatElement,
  // HTMLIntlNumberFormatFormatToPartsElement,
  // HTMLIntlNumberFormatFormatRangeElement,
  // HTMLIntlNumberFormatFormatRangeToPartsElement,
}
