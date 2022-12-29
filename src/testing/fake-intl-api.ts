import type {LocaleList} from '../utils/locale-list';

export interface FakeIntlApiOptions {
  unit?: string;
  currency?: string;
  timeZone?: string;
}

export interface ResolvedFakeIntlApiOptions extends FakeIntlApiOptions {
  locale: string;
};

export class FakeIntlApi {
  // @ts-ignore
  #locales: LocaleList;
  // @ts-ignore
  #options: FakeIntlApiOptions;

  constructor(locales: string | string[], options: any = {}) {
    try {
      // @ts-ignore
      this.#locales = Intl.getCanonicalLocales(locales);
    } catch {
      // @ts-ignore
      this.#locales = [];
    }
    this.#options = options;
  }

  static supportedLocalesOf(list: string | string[]) {
    const supportedLocales = ['ar', 'en', 'es', 'ja', 'fr', 'zh', 'zh-Hant'];
    if (list.includes('veryveryinvalid')) {
      throw new RangeError();
    }
    if (Array.isArray(list)) {
      return list.filter(locale => supportedLocales.includes(locale));
    } else if (typeof list === 'string') {
      return supportedLocales.includes(list) ? [list] : [];
    }
    return [];
  }

  resolvedOptions(): ResolvedFakeIntlApiOptions {
    return {
      locale: this.#locales[0] ?? 'en',
      unit: this.#options.unit,
      currency: this.#options.currency,
      timeZone: this.#options.timeZone,
    };
  }

  format(subject: string | Date): string {
    if (subject instanceof Date) {
      return subject.toISOString();
    }

    switch (subject) {
      case 'day':
        return 'day';
      case 'year':
        return 'year';
      default:
        return '';
    }
  }
}
