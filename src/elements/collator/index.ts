import HTMLIntlCollatorElement from './collator';
// import HTMLIntlCollatorCompareElement from './collator-compare';

declare global {
  interface HTMLElementTagNameMap {
    'intl-collator': HTMLIntlCollatorElement;
    // 'intl-collator-compare': HTMLIntlCollatorCompareElement;
  }
}

export function defineIntlCollatorElements() {
  customElements.define('intl-collator', HTMLIntlCollatorElement);
  // customElements.define('intl-collator-compare', HTMLIntlCollatorCompareElement);
}

export {
  HTMLIntlCollatorElement,
  // HTMLIntlCollatorCompareElement,
}
