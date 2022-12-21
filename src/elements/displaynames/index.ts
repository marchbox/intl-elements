import HTMLIntlDisplayNamesElement from './displaynames.js';
import HTMLIntlDisplayNamesOfElement from './displaynames-of.js';

declare global {
  interface HTMLElementTagNameMap {
    'intl-displaynames': HTMLIntlDisplayNamesElement;
    'intl-displaynames-of': HTMLIntlDisplayNamesOfElement;
  }
}

export function defineIntlDisplayNamesElements() {
  customElements.define('intl-displaynames', HTMLIntlDisplayNamesElement);
  customElements.define('intl-displaynames-of', HTMLIntlDisplayNamesOfElement);
}

export {
  HTMLIntlDisplayNamesElement,
  HTMLIntlDisplayNamesOfElement,
}
