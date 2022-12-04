import HTMLIntlListFormatElement from './listformat';
import HTMLIntlListFormatFormatElement from './listformat-format';
import HTMLIntlListFormatFormatToPartsElement from './listformat-formattoparts';

declare global {
  interface HTMLElementTagNameMap {
    'intl-listformat': HTMLIntlListFormatElement;
    'intl-listformat-format': HTMLIntlListFormatFormatElement;
    'intl-listformat-formattoparts': HTMLIntlListFormatFormatToPartsElement;
  }
}

export function defineIntlListFormatElements() {
  customElements.define('intl-listformat', HTMLIntlListFormatElement);
  customElements.define('intl-listformat-format', HTMLIntlListFormatFormatElement);
  customElements.define('intl-listformat-formattoparts', HTMLIntlListFormatFormatToPartsElement);
}

export {
  HTMLIntlListFormatElement,
  HTMLIntlListFormatFormatElement,
  HTMLIntlListFormatFormatToPartsElement,
}
