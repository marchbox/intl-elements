import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';

type ResolvedOptionsReturnType = Intl.ResolvedCollatorOptions |
    Intl.ResolvedDateTimeFormatOptions |
    Intl.ResolvedDisplayNamesOptions |
    Intl.ResolvedListFormatOptions |
    Intl.ResolvedNumberFormatOptions |
    Intl.ResolvedPluralRulesOptions |
    Intl.ResolvedRelativeTimeFormatOptions |
    Intl.ResolvedSegmenterOptions;

enum AttrName {
  LANG = 'lang',
  DIR = 'dir',
}

enum AttrValue {
  DIR_RTL = 'rtl',
}

export default abstract class AbstractIntlElement extends LitElement {
  protected abstract intlObj: any;

  #localeList: Intl.BCP47LanguageTag[] = [];

  #attrObserver!: MutationObserver;

  #isUpdatingLangAttr = false;

  // `localeList` is a read-only property.
  @property({attribute: false})
  get localeList(): Intl.BCP47LanguageTag[] {
    return this.#localeList;
  }

  @property({reflect: true})
  locales = '';

  @property({attribute: 'locale-matcher', reflect: true})
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  abstract resolvedOptions(): ResolvedOptionsReturnType;

  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'none');
    }

    this.#maybeAdoptLangForLocales();
    this.#observeLangAttr();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.#attrObserver) {
      this.#attrObserver.disconnect();
    }
  }

  protected override shouldUpdate(changes: PropertyValues<this>): boolean {
    return this.#isValid(changes);
  }

  protected override willUpdate(changes: PropertyValues<this>) {
    if (changes.has('locales')) {
      this.#updateLocaleList();
    }
  }

  #isValid(changes: PropertyValues<this>): boolean {
    return Array.from(changes.entries()).every(([key, value]) => {
      try {
        const supported = Intl
            .supportedValuesOf(key as Intl.SupportedValueKey)
            .includes(value as string);
        if (!supported) {
          throw new Error(`Invalid value of ${key.toString()}: ${value}`);
        }
      } catch {}

      return true;
    });
  }

  #updateLocaleList() {
    try {
      this.#localeList = this.intlObj.supportedLocalesOf(
        this.locales.split(' '),
        {localeMatcher: this.localeMatcher}
      );
      this.#updateLangAndDirAttrs();
    } catch {
      this.#localeList = [];
    }
  }

  #observeLangAttr() {
    this.#attrObserver = new MutationObserver(() => {
      if (!this.#isUpdatingLangAttr) {
        this.#maybeAdoptLangForLocales();
      } else {
        this.#isUpdatingLangAttr = false;
      }
    });

    this.#attrObserver.observe(this, {
      attributes: true,
      attributeFilter: [AttrName.LANG],
    });
  }

  #maybeAdoptLangForLocales() {
    if (!this.hasAttribute('locales') && this.hasAttribute(AttrName.LANG)) {
      this.locales = this.getAttribute(AttrName.LANG)!;
    }
  }

  #updateLangAndDirAttrs() {
    const newLang = this.#localeList?.[0];

    if (!newLang) {
      return;
    }

    const oldLang = this.getAttribute(AttrName.LANG);
    if (oldLang !== newLang) {
      this.#isUpdatingLangAttr = true;
      this.setAttribute(AttrName.LANG, newLang);
    }

    const isRtl =
        new Intl.Locale(newLang)?.textInfo?.direction === AttrValue.DIR_RTL;
    if (isRtl) {
      this.setAttribute(AttrName.DIR, AttrValue.DIR_RTL);
    } else {
      this.removeAttribute(AttrName.DIR);
    }
  }
}
