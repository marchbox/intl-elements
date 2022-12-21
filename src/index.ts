import HTMLIntlCollatorElement from './elements/collator/collator.js';
import HTMLIntlCollatorCompareElement from './elements/collator/collator-compare.js';
import HTMLIntlDateTimeFormatElement from './elements/datetimeformat/datetimeformat.js';
import HTMLIntlDateTimeFormatFormatElement from './elements/datetimeformat/datetimeformat-format.js';
import HTMLIntlDateTimeFormatFormatToPartsElement from './elements/datetimeformat/datetimeformat-formattoparts.js';
import HTMLIntlDateTimeFormatFormatRangeElement from './elements/datetimeformat/datetimeformat-formatrange.js';
import HTMLIntlDateTimeFormatFormatRangeToPartsElement from './elements/datetimeformat/datetimeformat-formatrangetoparts.js';
import HTMLIntlDisplayNamesElement from './elements/displaynames/displaynames.js';
import HTMLIntlDisplayNamesOfElement from './elements/displaynames/displaynames-of.js';
import HTMLIntlListFormatElement from './elements/listformat/listformat.js';
import HTMLIntlListFormatFormatElement from './elements/listformat/listformat-format.js';
import HTMLIntlListFormatFormatToPartsElement from './elements/listformat/listformat-formattoparts.js';
import HTMLIntlLocaleElement from './elements/locale/locale.js';
import HTMLIntlNumberFormatElement from './elements/numberformat/numberformat.js';
import HTMLIntlNumberFormatFormatElement from './elements/numberformat/numberformat-format.js';
import HTMLIntlNumberFormatFormatToPartsElement from './elements/numberformat/numberformat-formattoparts.js';
// import HTMLIntlNumberFormatFormatRangeElement from './elements/numberformat/numberformat-formatrange.js';
// import HTMLIntlNumberFormatFormatRangeToPartsElement from './elements/numberformat/numberformat-formatrangetoparts.js';
import HTMLIntlPluralRulesElement from './elements/pluralrules/pluralrules.js';
import HTMLIntlPluralRulesSelectElement from './elements/pluralrules/pluralrules-select.js';
// import HTMLIntlPluralRulesSelectRangeElement from './elements/pluralrules/pluralrules-selectrange';
import HTMLIntlRelativeTimeFormatElement from './elements/relativetimeformat/relativetimeformat.js';
import HTMLIntlRelativeTimeFormatFormatElement from './elements/relativetimeformat/relativetimeformat-format.js';
import HTMLIntlRelativeTimeFormatFormatToPartsElement from './elements/relativetimeformat/relativetimeformat-formattoparts.js';
import HTMLIntlSegmenterElement from './elements/segmenter/segmenter.js';
import HTMLIntlSegmenterSegmentElement from './elements/segmenter/segmenter-segment.js';

export {
  HTMLIntlCollatorElement,
  HTMLIntlCollatorCompareElement,
  HTMLIntlDateTimeFormatElement,
  HTMLIntlDateTimeFormatFormatElement,
  HTMLIntlDateTimeFormatFormatToPartsElement,
  HTMLIntlDateTimeFormatFormatRangeElement,
  HTMLIntlDateTimeFormatFormatRangeToPartsElement,
  HTMLIntlDisplayNamesElement,
  HTMLIntlDisplayNamesOfElement,
  HTMLIntlListFormatElement,
  HTMLIntlListFormatFormatElement,
  HTMLIntlListFormatFormatToPartsElement,
  HTMLIntlLocaleElement,
  HTMLIntlNumberFormatElement,
  HTMLIntlNumberFormatFormatElement,
  HTMLIntlNumberFormatFormatToPartsElement,
  // HTMLIntlNumberFormatFormatRangeElement,
  // HTMLIntlNumberFormatFormatRangeToPartsElement,
  HTMLIntlPluralRulesElement,
  HTMLIntlPluralRulesSelectElement,
  // HTMLIntlPluralRulesSelectRangeElement,
  HTMLIntlRelativeTimeFormatElement,
  HTMLIntlRelativeTimeFormatFormatElement,
  HTMLIntlRelativeTimeFormatFormatToPartsElement,
  HTMLIntlSegmenterElement,
  HTMLIntlSegmenterSegmentElement,
}

export function defineIntlCollatorElements() {
  customElements.define('intl-collator', HTMLIntlCollatorElement);
  customElements.define('intl-collator-compare', HTMLIntlCollatorCompareElement);
}

export function defineIntlDateTimeFormatElements() {
  customElements.define('intl-datetimeformat', HTMLIntlDateTimeFormatElement);
  customElements.define('intl-datetimeformat-format', HTMLIntlDateTimeFormatFormatElement);
  customElements.define('intl-datetimeformat-formattoparts', HTMLIntlDateTimeFormatFormatToPartsElement);
  customElements.define('intl-datetimeformat-formatrange', HTMLIntlDateTimeFormatFormatRangeElement);
  customElements.define('intl-datetimeformat-formatrangetoparts', HTMLIntlDateTimeFormatFormatRangeToPartsElement);
}

export function defineIntlDisplayNamesElements() {
  customElements.define('intl-displaynames', HTMLIntlDisplayNamesElement);
  customElements.define('intl-displaynames-of', HTMLIntlDisplayNamesOfElement);
}

export function defineIntlListFormatElements() {
  customElements.define('intl-listformat', HTMLIntlListFormatElement);
  customElements.define('intl-listformat-format', HTMLIntlListFormatFormatElement);
  customElements.define('intl-listformat-formattoparts', HTMLIntlListFormatFormatToPartsElement);
}

export function defineIntlLocaleElements() {
  customElements.define('intl-locale', HTMLIntlLocaleElement);
}

export function defineIntlNumberFormatElements() {
  customElements.define('intl-numberformat', HTMLIntlNumberFormatElement);
  customElements.define('intl-numberformat-format', HTMLIntlNumberFormatFormatElement);
  customElements.define('intl-numberformat-formattoparts', HTMLIntlNumberFormatFormatToPartsElement);
  // customElements.define('intl-numberformat-formatrange', HTMLIntlNumberFormatFormatRangeElement);
  // customElements.define('intl-numberformat-formatrangetoparts', HTMLIntlNumberFormatFormatRangeToPartsElement);
}

export function defineIntlPluralRulesElements() {
  customElements.define('intl-pluralrules', HTMLIntlPluralRulesElement);
  customElements.define('intl-pluralrules-select', HTMLIntlPluralRulesSelectElement);
  // customElements.define('intl-pluralrules-selectrange', HTMLIntlPluralRulesSelectRangeElement);
}

export function defineIntlRelativeTimeFormatElements() {
  customElements.define('intl-relativetimeformat', HTMLIntlRelativeTimeFormatElement);
  customElements.define('intl-relativetimeformat-format', HTMLIntlRelativeTimeFormatFormatElement);
  customElements.define('intl-relativetimeformat-formattoparts', HTMLIntlRelativeTimeFormatFormatToPartsElement);
}

export function defineIntlSegmenterElements() {
  customElements.define('intl-segmenter', HTMLIntlSegmenterElement);
  customElements.define('intl-segmenter-segment', HTMLIntlSegmenterSegmentElement);
}

export function defineIntlElements() {
  defineIntlCollatorElements();
  defineIntlDateTimeFormatElements();
  defineIntlDisplayNamesElements();
  defineIntlListFormatElements();
  defineIntlLocaleElements();
  defineIntlNumberFormatElements();
  defineIntlPluralRulesElements();
  defineIntlRelativeTimeFormatElements();
  defineIntlSegmenterElements();
}

declare global {
  interface HTMLElementTagNameMap {
    'intl-collator': HTMLIntlCollatorElement;
    'intl-collator-compare': HTMLIntlCollatorCompareElement;
    'intl-datetimeformat': HTMLIntlDateTimeFormatElement;
    'intl-datetimeformat-format': HTMLIntlDateTimeFormatFormatElement;
    'intl-datetimeformat-formattoparts': HTMLIntlDateTimeFormatFormatToPartsElement;
    'intl-datetimeformat-formatrange': HTMLIntlDateTimeFormatFormatRangeElement;
    'intl-datetimeformat-formatrangetoparts': HTMLIntlDateTimeFormatFormatRangeToPartsElement;
    'intl-displaynames': HTMLIntlDisplayNamesElement;
    'intl-displaynames-of': HTMLIntlDisplayNamesOfElement;
    'intl-listformat': HTMLIntlListFormatElement;
    'intl-listformat-format': HTMLIntlListFormatFormatElement;
    'intl-listformat-formattoparts': HTMLIntlListFormatFormatToPartsElement;
    'intl-locale': HTMLIntlLocaleElement;
    'intl-numberformat': HTMLIntlNumberFormatElement;
    'intl-numberformat-format': HTMLIntlNumberFormatFormatElement;
    'intl-numberformat-formattoparts': HTMLIntlNumberFormatFormatToPartsElement;
    // 'intl-numberformat-formatrange': HTMLIntlNumberFormatFormatRangeElement;
    // 'intl-numberformat-formatrangetoparts': HTMLIntlNumberFormatFormatRangeToPartsElement;
    'intl-pluralrules': HTMLIntlPluralRulesElement;
    'intl-pluralrules-select': HTMLIntlPluralRulesSelectElement;
    // 'intl-pluralrules-selectrange': HTMLIntlPluralRulesSelectRangeElement;
    'intl-relativetimeformat': HTMLIntlRelativeTimeFormatElement;
    'intl-relativetimeformat-format': HTMLIntlRelativeTimeFormatFormatElement;
    'intl-relativetimeformat-formattoparts': HTMLIntlRelativeTimeFormatFormatToPartsElement;
    'intl-segmenter': HTMLIntlSegmenterElement;
    'intl-segmenter-segment': HTMLIntlSegmenterSegmentElement;
  }

  namespace JSX {
    // TODO: Remove `& any`.
    interface IntrinsicElements {
      'intl-collator': HTMLIntlCollatorElement & any;
      'intl-collator-compare': HTMLIntlCollatorCompareElement & any;
      'intl-datetimeformat': HTMLIntlDateTimeFormatElement & any;
      'intl-datetimeformat-format': HTMLIntlDateTimeFormatFormatElement & any;
      'intl-datetimeformat-formattoparts': HTMLIntlDateTimeFormatFormatToPartsElement & any;
      'intl-datetimeformat-formatrange': HTMLIntlDateTimeFormatFormatRangeElement & any;
      'intl-datetimeformat-formatrangetoparts': HTMLIntlDateTimeFormatFormatRangeToPartsElement & any;
      'intl-displaynames': HTMLIntlDisplayNamesElement & any;
      'intl-displaynames-of': HTMLIntlDisplayNamesOfElement & any;
      'intl-listformat': HTMLIntlListFormatElement & any;
      'intl-listformat-format': HTMLIntlListFormatFormatElement & any;
      'intl-listformat-formattoparts': HTMLIntlListFormatFormatToPartsElement & any;
      'intl-locale': HTMLIntlLocaleElement & any;
      'intl-numberformat': HTMLIntlNumberFormatElement & any;
      'intl-numberformat-format': HTMLIntlNumberFormatFormatElement & any;
      'intl-numberformat-formattoparts': HTMLIntlNumberFormatFormatToPartsElement & any;
      // 'intl-numberformat-formatrange': HTMLIntlNumberFormatFormatRangeElement & any;
      // 'intl-numberformat-formatrangetoparts': HTMLIntlNumberFormatFormatRangeToPartsElement & any;
      'intl-pluralrules': HTMLIntlPluralRulesElement & any;
      'intl-pluralrules-select': HTMLIntlPluralRulesSelectElement & any;
      // 'intl-pluralrules-selectrange': HTMLIntlPluralRulesSelectRangeElement & any;
      'intl-relativetimeformat': HTMLIntlRelativeTimeFormatElement & any;
      'intl-relativetimeformat-format': HTMLIntlRelativeTimeFormatFormatElement & any;
      'intl-relativetimeformat-formattoparts': HTMLIntlRelativeTimeFormatFormatToPartsElement & any;
      'intl-segmenter': HTMLIntlSegmenterElement & any;
      'intl-segmenter-segment': HTMLIntlSegmenterSegmentElement & any;
    }
  }

  namespace Intl {
    // TODO: Remove when this bug is fixed:
    // https://github.com/microsoft/TypeScript/issues/49231
    // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
    function supportedValuesOf(key: string): string[];

    // TODO: Remove when TypeScript supports this:
    // See: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales
    function getCanonicalLocales(locales: string | string[]): string[];

    // TODO: Remove when TypeScript adds the support.
    interface Locale {
      calendars: string[];
      hourCycles: string[];
      numberingSystems: string[];
      textInfo: {
        direction: 'ltr' | 'rtl';
      };
      timeZones: string[];
      weekInfo: {
        firstDay: 1 | 2 | 3 | 4 | 5 | 6 | 7;
        weekend: [1 | 2 | 3 | 4 | 5 | 6 | 7, 1 | 2 | 3 | 4 | 5 | 6 | 7];
        minimalDays: 1 | 7;
      };
    }

    // TODO: Remove when this bug is fixed:
    // https://github.com/microsoft/TypeScript/issues/51023
    // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions
    interface ResolvedListFormatOptions {
      locale: string;
      style: string;
      type: string;
    }

    // TODO: Remove when this bug is fixed:
    // https://github.com/microsoft/TypeScript/issues/51023
    // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions
    interface ListFormat {
      resolvedOptions(): ResolvedListFormatOptions;
    }

    // TODO: Remove when this is supported in TypeScript.
    type ListFormatPart = {type: 'element' | 'literal', value: string};

    interface DateTimeFormatPart {
      source: string;
    }

    interface CollatorOptions {
      collation?: string;
    }
  }
}
