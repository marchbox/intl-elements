import {normalizeLocale} from './locales.js';

export type IntlApiType = typeof Intl.Collator |
    typeof Intl.DateTimeFormat |
    typeof Intl.DisplayNames |
    typeof Intl.ListFormat |
    typeof Intl.NumberFormat |
    typeof Intl.PluralRules |
    typeof Intl.RelativeTimeFormat |
    typeof Intl.Segmenter;

export interface LocaleList extends DOMTokenList {
  valueAsArray: string[];
}

// Details about this implementation:
// https://github.com/marchbox/intl-elements/issues/47
export function createLocaleList(
  intl: IntlApiType,
  value: string,
  onChange?: () => void,
): {
  localeList: LocaleList,
  destroy: () => void,
} {
  const hostingElement = document.createElement('div');

  // @ts-ignore
  const localeList: LocaleList = hostingElement.classList;
  localeList.value = value;
  Object.defineProperties(localeList, {
    supports: {
      value: function(locale: string): boolean {
        const normalizedLocale = normalizeLocale(locale);
        return Boolean(normalizedLocale) &&
            intl.supportedLocalesOf(normalizedLocale).length > 0;
      },
    },
    valueAsArray: {
      get: () => Array.from(localeList.values()),
    },
  });

  let observer: MutationObserver | undefined;
  if (typeof onChange === 'function') {
    observer = new MutationObserver(() => {
      onChange();
    });
    observer.observe(hostingElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  return {
    localeList,
    destroy() {
      observer?.disconnect();
      hostingElement.remove();
    },
  };
}
