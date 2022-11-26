import { normalizeLocale } from "./locales";

export type IntlObjType = typeof Intl.Collator |
    typeof Intl.DateTimeFormat |
    typeof Intl.DisplayNames |
    typeof Intl.ListFormat |
    typeof Intl.NumberFormat |
    typeof Intl.PluralRules |
    typeof Intl.RelativeTimeFormat |
    typeof Intl.Segmenter;

export default class implements DOMTokenList {
  #list: string[] = [];
  #intlObj: IntlObjType;

  [index: number]: string;

  [Symbol.iterator](): IterableIterator<string> {
    return this.#list[Symbol.iterator]();
  }

  get value(): string {
    return this.#list.join(' ');
  }

  set value(val: string) {
    this.#list = val.toString().trim().split(' ');
  }

  get length(): number {
    return this.#list.length;
  }

  constructor(intlObj: IntlObjType, list: string) {
    this.value = list;
    this.#intlObj = intlObj;
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
    for (const val of vals) {
      if (!this.contains(val)) {
        this.#list.push(val.toString());
      }
    }
  }

  remove(...vals: string[]): void {
    for (const val of vals) {
      const index = this.#list.indexOf(val.toString());
      if (index !== -1) {
        this.#list.splice(index, 1);
      }
    }
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
    if (index !== -1) {
      this.#list.splice(index, 1, newVal.toString());
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

  forEach(callback: (val: string, key: number, list: DOMTokenList) => void): void {
    this.#list.forEach((val, key) =>
        callback(val, key, this as unknown as DOMTokenList));
  }

  supports(locale: string): boolean {
    const normalizedLocale = normalizeLocale(locale);
    if (normalizedLocale === null) {
      return false;
    }
    return this.#intlObj.supportedLocalesOf(locale).length > 0;
  }
}
