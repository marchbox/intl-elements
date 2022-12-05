export class FakeIntlApi {
  // @ts-ignore
  #locales: string[];
  // @ts-ignore
  #options: any;

  constructor(locales: string | string[], options: any = {}) {
    // @ts-ignore
    this.#locales = Intl.getCanonicalLocales(locales);
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

  format(unit: string): string {
    switch (unit) {
      case 'day':
        return 'day';
      case 'year':
        return 'year';
      default:
        return '';
    }
  }
}
