import HTMLIntlCollatorElement from './collator.js';
import HTMLIntlCollatorCompareElement from './collator-compare.js';

declare global {
  interface HTMLElementTagNameMap {
    'intl-collator': HTMLIntlCollatorElement;
    'intl-collator-compare': HTMLIntlCollatorCompareElement;
  }
}

export function defineIntlCollatorElements() {
  customElements.define('intl-collator', HTMLIntlCollatorElement);
  customElements.define('intl-collator-compare', HTMLIntlCollatorCompareElement);
}

export {
  HTMLIntlCollatorElement,
  HTMLIntlCollatorCompareElement,
}
