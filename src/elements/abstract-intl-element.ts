import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';

import {default as LocaleList, IntlObjType} from '../utils/locale-list';
import {isLocaleRtl} from '../utils/locales';
import HTMLIntlLocaleElement from './locale/locale';

type ResolvedOptionsReturnType = Intl.ResolvedCollatorOptions |
    Intl.ResolvedDateTimeFormatOptions |
    Intl.ResolvedDisplayNamesOptions |
    Intl.ResolvedListFormatOptions |
    Intl.ResolvedNumberFormatOptions |
    Intl.ResolvedPluralRulesOptions |
    Intl.ResolvedRelativeTimeFormatOptions |
    Intl.ResolvedSegmenterOptions;

export default abstract class AbstractIntlElement extends LitElement {
  #previousLocaleList?: LocaleList;

  #attrObserver!: MutationObserver;
  #ancestorObserver!: MutationObserver;

  #isUpdatingLangAttr = false;
  #isUpdatingLocalesAttr = false;

  #localeList!: LocaleList;

  @property({attribute: false})
  get localeList(): LocaleList {
    return this.#localeList;
  }

  @property({reflect: true})
  get locales(): string | null {
    return this.getAttribute('locales');
  }

  set locales(value: string | null) {
    this.#isUpdatingLocalesAttr = true;
    this.localeList.value = value ?? '';
  }

  @property({attribute: 'locales-from'})
  localesFrom = '';

  @property({attribute: 'option-localematcher'})
  optionLocaleMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  constructor() {
    super();

    this.#setUpLocaleList();
  }

  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'none');
    }

    this.#localeList.value = this.getAttribute('locales') ?? '';

    if (this.localeList.length === 0) {
      this.localeList.value = this.#getInitialLocales();
    }
    this.#observeForLocaleList();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.#attrObserver) {
      this.#attrObserver.disconnect();
    }

    if (this.#ancestorObserver) {
      this.#ancestorObserver.disconnect();
    }
  }

  protected override shouldUpdate(changes: PropertyValues<this>): boolean {
    return this.#isValid(changes);
  }

  abstract resolvedOptions(): ResolvedOptionsReturnType;

  protected abstract getIntlObj(): IntlObjType;

  #setUpLocaleList() {
    this.#localeList = new LocaleList(this.getIntlObj(), '');
    this.#localeList.onChange(() => {
      // Updates `locales` attribute.
      if (!this.#isUpdatingLocalesAttr) {
        this.locales = this.localeList.value;
      } else {
        this.#isUpdatingLocalesAttr = false;
      }

      // Updates `lang` and `dir` attributes.
      const primaryLang = this.localeList.item(0);
      if (!this.#isUpdatingLangAttr) {
        if (primaryLang && primaryLang !== this.lang) {
          this.setAttribute('lang', primaryLang);

          if (isLocaleRtl(primaryLang)) {
            this.setAttribute('dir', 'rtl');
          } else {
            this.removeAttribute('dir');
          }
        }
      } else {
        this.#isUpdatingLangAttr = false;
      }

      this.requestUpdate('localeList', this.#previousLocaleList);

      this.#previousLocaleList =
          new LocaleList(this.getIntlObj(), this.localeList.value);
    });
  }

  // An intl element uses multiple signals to determine the locales. The
  // following list is the order of priorities (from highest to lowest):
  //
  // 1. `locales` attribute on the element
  // 2. `lang` attribute on the element
  // 3. Locales from `<intl-locale>` elements associated with the element via
  //    its `locales-from` attribute
  // 4. Locales from `<intl-locale>` elements associated with the element via
  //    being its ancestors or `lang` attribute on the closest ancestor all the
  //    way to the `documentElement`, whichever is the closest. Note that unlike
  //    using the `locales-from` attribute which allows you to associate
  //    multiple locales, only the closest `lang` attribute or `<intl-locale>`
  //    element is used, so you can only associate ONE locale in this way.
  #getInitialLocales(): string {
    let locales = '';

    const funcs = [
      this.#getLocalesFromLangAttr,
      this.#getLocalesFromLocalesFromAttr,
      this.#getLocalesFromAncestor,
    ];

    for (const func of funcs) {
      locales = func.call(this);
      if (locales) {
        break;
      }
    }

    return locales;
  }

  #getLocalesFromLangAttr(): string {
    return this.getAttribute('lang') || '';
  }

  #getLocalesFromLocalesFromAttr(): string {
    if (!this.localesFrom) {
      return '';
    }

    const ids = this.localesFrom.split(' ');
    return ids.map(id => {
      const el =
          document.querySelector(`intl-locale#${id}`) as HTMLIntlLocaleElement;
      return el?.valueAsString ?? '';;
    }).filter(Boolean).join(' ');
  }

  #getLocalesFromAncestor(): string {
    const el = this.closest('[lang], intl-locale') as HTMLElement;
    if (!el) {
      return '';
    }

    if (el.tagName === 'INTL-LOCALE') {
      return (el as HTMLIntlLocaleElement).valueAsString;
    } else {
      return el.getAttribute('lang') || '';
    }
  }

  #observeForLocaleList() {
    this.#observeAttrs();
    this.#observeAncestor();
  }

  #observeAttrs() {
    // TODO: Implement.
  }

  #observeAncestor() {
    // TODO: Implement.
  }

  // Makes sure some Intl option values and method arguments are valid.
  #isValid(changes: PropertyValues<this>): boolean {
    return Array.from(changes.entries()).every(([key]) => {
      let supported = true;
      try {
        // Transforms `optionFooBar` to `fooBar`.
        const _key = (key as string)
            .replace(/^[a-z]+/, '')
            .replace(/^[A-Z]/, letter => letter.toLowerCase());

        supported = Intl
            .supportedValuesOf(_key as Intl.SupportedValueKey)
            // @ts-ignore
            .includes(this[key] as string);
      } catch {}

      if (!supported) {
        return false;
      }

      return true;
    });
  }
}
