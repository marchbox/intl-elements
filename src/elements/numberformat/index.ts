import HTMLIntlNumberFormatElement from './numberformat';
import HTMLIntlNumberFormatFormatElement from './numberformat-format';
import HTMLIntlNumberFormatFormatToPartsElement from './numberformat-formattoparts';

declare global {
  interface HTMLElementTagNameMap {
    'intl-numberformat': HTMLIntlNumberFormatElement;
    'intl-numberformat-format': HTMLIntlNumberFormatFormatElement;
    'intl-numberformat-formattoparts': HTMLIntlNumberFormatFormatToPartsElement;
  }
}

export function defineIntlNumberFormatElements() {
  customElements.define('intl-numberformat', HTMLIntlNumberFormatElement);
  customElements.define('intl-numberformat-format', HTMLIntlNumberFormatFormatElement);
  customElements.define('intl-numberformat-formattoparts', HTMLIntlNumberFormatFormatToPartsElement);
}

export {
  HTMLIntlNumberFormatElement,
  HTMLIntlNumberFormatFormatElement,
  HTMLIntlNumberFormatFormatToPartsElement,
}
