import {normalizeLocale} from './locales.js';

export type IntlApiType = typeof Intl.Collator |
    typeof Intl.DateTimeFormat |
    typeof Intl.DisplayNames |
    typeof Intl.ListFormat |
    typeof Intl.NumberFormat |
    typeof Intl.PluralRules |
    typeof Intl.RelativeTimeFormat |
    typeof Intl.Segmenter;

export type LocaleListOnChangeCallback = (list: LocaleList) => void;

function clearIndexAccessors(list: string[], localeList: LocaleList) {
  list.forEach((_, i) => {
    Object.defineProperty(localeList, i, {
      get: () => undefined,
    });
  });
}

function addIndexAccessors(list: string[], localeList: LocaleList) {
  list.forEach((el, i) => {
    Object.defineProperty(localeList, i, {
      configurable: true,
      get: () => el,
      set: () => {},
    });
  });
}

export default class LocaleList implements DOMTokenList {
  #list: Intl.BCP47LanguageTag[] = [];
  #intlApi: IntlApiType;
  #onChangeCallbacks: LocaleListOnChangeCallback[] = [];

  [index: number]: string;

  [Symbol.toStringTag]: string = 'LocaleList';

  get value(): string {
    return this.#list.join(' ');
  }

  set value(val: string) {
    clearIndexAccessors(this.#list, this);
    this.#list = val.toString().trim().split(' ')
        .filter(locale => this.supports(locale));
    addIndexAccessors(this.#list, this);

    this.#triggerOnChange();
  }

  get valueAsArray(): string[] {
    return this.#list;
  }

  get length(): number {
    return this.#list.length;
  }

  constructor(intlApi: IntlApiType, list: string) {
    this.#intlApi = intlApi;
    this.value = list;
  }

  [Symbol.iterator](): IterableIterator<string> {
    return this.#list[Symbol.iterator]();
  }

  toString(): string {
    return this.value;
  }

  item(index: number): string | null {
    return this.#list[index] ?? null;
  }

  contains(val: string): boolean {
    return this.#list.includes(val.toString());
  }

  add(...vals: string[]): void {
    clearIndexAccessors(this.#list, this);
    for (const val of vals) {
      if (!this.contains(val) && this.supports(val)) {
        this.#list.push(val.toString());
        this.#triggerOnChange();
      }
    }
    addIndexAccessors(this.#list, this);
  }

  remove(...vals: string[]): void {
    clearIndexAccessors(this.#list, this);
    for (const val of vals) {
      const index = this.#list.indexOf(val.toString());
      if (index !== -1) {
        this.#list.splice(index, 1);
        this.#triggerOnChange();
      }
    }
    addIndexAccessors(this.#list, this);
  }

  toggle(val: string, force?: boolean): boolean {
    if (force === true) {
      this.add(val);
      return true;
    } else if (force === false) {
      this.remove(val);
      return false;
    } else {
      if (this.contains(val)) {
        this.remove(val);
        return false;
      } else {
        this.add(val);
        return true;
      }
    }
  }

  replace(oldVal: string, newVal: string): boolean {
    const index = this.#list.indexOf(oldVal.toString());
    if (index !== -1 && this.supports(newVal)) {
      this.#list.splice(index, 1, newVal.toString());
      Object.defineProperty(this, index, {
        get: () => newVal.toString(),
      });
      this.#triggerOnChange();
      return true;
    } else {
      return false;
    }
  }

  entries(): IterableIterator<[number, string]> {
    return this.#list.entries();
  }

  keys(): IterableIterator<number> {
    return this.#list.keys();
  }

  values(): IterableIterator<string> {
    return this.#list.values();
  }

  forEach(callback: (val: string, key: number, list: LocaleList) => void): void {
    this.#list.forEach((val, key) =>
        callback(val, key, this as unknown as LocaleList));
  }

  supports(locale: string): boolean {
    const normalizedLocale = normalizeLocale(locale);
    return Boolean(normalizedLocale) &&
        this.#intlApi.supportedLocalesOf(normalizedLocale).length > 0;
  }

  onChange(callback: LocaleListOnChangeCallback): void {
    this.#onChangeCallbacks.push(callback);
  }

  #triggerOnChange(): void {
    this.#onChangeCallbacks.forEach(callback => callback(this));
  }
}
