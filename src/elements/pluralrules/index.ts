import HTMLIntlPluralRulesElement from './pluralrules.js';
import HTMLIntlPluralRulesSelectElement from './pluralrules-select.js';
// import HTMLIntlPluralRulesSelectRangeElement from './pluralrules-selectrange';

declare global {
  interface HTMLElementTagNameMap {
    'intl-pluralrules': HTMLIntlPluralRulesElement;
    'intl-pluralrules-select': HTMLIntlPluralRulesSelectElement;
    // 'intl-pluralrules-selectrange': HTMLIntlPluralRulesSelectRangeElement;
  }
}

export function defineIntlPluralRulesElements() {
  customElements.define('intl-pluralrules', HTMLIntlPluralRulesElement);
  customElements.define('intl-pluralrules-select', HTMLIntlPluralRulesSelectElement);
  // customElements.define('intl-pluralrules-selectrange', HTMLIntlPluralRulesSelectRangeElement);
}

export {
  HTMLIntlPluralRulesElement,
  HTMLIntlPluralRulesSelectElement,
  // HTMLIntlPluralRulesSelectRangeElement,
}
