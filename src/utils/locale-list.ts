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
  __destroy__: () => void;
}

// Details about this implementation:
// https://github.com/marchbox/intl-elements/issues/47
export function createLocaleList(
  intl: IntlApiType,
  value: string,
  onChange?: () => void,
): LocaleList {
  const hostingElement = document.createElement('div');
  let observer: MutationObserver | undefined;

  const localeList: Partial<LocaleList> = hostingElement.classList;
  localeList.value = value;

  Object.defineProperties(hostingElement.classList, {
    supports: {
      value: function(locale: string): boolean {
        const normalizedLocale = normalizeLocale(locale);
        if (Boolean(normalizedLocale) && intl) {
          if ('supportedLocalesOf' in intl) {
            return intl.supportedLocalesOf(normalizedLocale).length > 0;
          }
          return true;
        }
        return false;
      },
    },
    __destroy__: {
      value: function() {
        observer?.disconnect();
        hostingElement.remove();
      },
    },
  });

  if (typeof onChange === 'function') {
    observer = new MutationObserver(() => {
      onChange();
    });
    observer.observe(hostingElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  return localeList as LocaleList;
}
