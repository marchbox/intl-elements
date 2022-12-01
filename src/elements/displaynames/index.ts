import HTMLIntlDisplayNamesElement from './displaynames';
import HTMLIntlDisplayNamesOfElement from './displaynames-of';

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
