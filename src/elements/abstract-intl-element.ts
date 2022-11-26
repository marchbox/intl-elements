import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';

import {IntlObjType} from '../utils/locale-list.js';
import HTMLIntlLocaleElement from './locale/locale';

type ResolvedOptionsReturnType = Intl.ResolvedCollatorOptions |
    Intl.ResolvedDateTimeFormatOptions |
    Intl.ResolvedDisplayNamesOptions |
    Intl.ResolvedListFormatOptions |
    Intl.ResolvedNumberFormatOptions |
    Intl.ResolvedPluralRulesOptions |
    Intl.ResolvedRelativeTimeFormatOptions |
    Intl.ResolvedSegmenterOptions;

function getSupportedLocales(
  locales: string[],
  intlObj: IntlObjType,
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher,
): Intl.BCP47LanguageTag[] {
  try {
    return intlObj.supportedLocalesOf(locales, {localeMatcher});
  } catch {
    return [];
  }
}

export default abstract class AbstractIntlElement extends LitElement {
  protected abstract intlObj: IntlObjType;

  #localeList: Intl.BCP47LanguageTag[] = [];

  #attrObserver!: MutationObserver;

  #ancestorObserver!: MutationObserver;

  #isUpdatingLangAttr = false;

  // `localeList` is a read-only property.
  get localeList(): Intl.BCP47LanguageTag[] {
    return this.#localeList;
  }

  @property({reflect: true})
  locales = '';

  @property({attribute: 'locales-from'})
  localesFrom = '';

  @property({attribute: 'option-localematcher'})
  optionLocaleMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'none');
    }

    this.#determineLocales();
    this.#observeForLocales();
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

  protected override willUpdate(changes: PropertyValues<this>) {
    if (changes.has('locales')) {
      this.#updateLocaleList();
    }
  }

  abstract resolvedOptions(): ResolvedOptionsReturnType;

  // Makes sure some Intl option values are valid.
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
  #determineLocales() {
    // 1. `locales` attribute.
    // Nothing needs to be done.

    const adoptFuncs = [
      // 2. `lang` attribute.
      this.#getLocalesByLangAttr,

      // 3. `locales-from` attribute.
      this.#getLocalesByLocalesFromAttr,

      // 4. Closest `lang` attribute or `<intl-locale>` element.
      this.#getLocalesByAncestor,
    ]

    const localesByLocalesAttr = getSupportedLocales(
        this.locales.split(' '), this.intlObj, this.optionLocaleMatcher);

    if (localesByLocalesAttr.length !== 0) {
      return;
    }

    for (const adoptFunc of adoptFuncs) {
      const locales = adoptFunc.call(this);
      const supportedLocales =
          getSupportedLocales(locales, this.intlObj, this.optionLocaleMatcher);

      if (supportedLocales.length !== 0) {
        this.locales = locales.join(' ');
        break;
      }
    }
  }

  #updateLocaleList() {
    if (this.locales) {
      this.#localeList = getSupportedLocales(
          this.locales.split(' '), this.intlObj, this.optionLocaleMatcher);
    }

    this.#updateLangAndDirAttrs();
  }

  #getLocalesByLangAttr(): string[] {
    if (!this.hasAttribute('lang')) {
      return [];
    }

    return [this.getAttribute('lang')!];
  }

  #getLocalesByLocalesFromAttr(): string[] {
    if (!this.hasAttribute('locales-from')) {
      return [];
    }

    return this.getAttribute('locales-from')!.split(' ')
        .map(id => {
          const el = document
              .querySelector(`intl-locale#${id}`) as HTMLIntlLocaleElement;
          return el?.valueAsString ?? null;
        })
        .filter(locale => locale !== null);
  }

  #getLocalesByAncestor(): string[] {
    const candidateEl = this.closest('[lang], intl-locale') as HTMLElement;
    if (!candidateEl) {
      return [];
    }

    if (candidateEl.nodeName === 'INTL-LOCALE') {
      return [(candidateEl as HTMLIntlLocaleElement).valueAsString];
    } else {
      return [candidateEl.getAttribute('lang')!];
    }
  }

  #observeForLocales() {
    this.#observeAttrs();
    this.#observeAncestor();
  }

  #observeAttrs() {
    this.#attrObserver = new MutationObserver(entries => {
      const {attributeName} = entries[0]!;
      let locales: string[] = [];

      switch (attributeName) {
        case 'lang':
          if (!this.#isUpdatingLangAttr && !this.hasAttribute('locales')) {
            locales = this.#getLocalesByLangAttr();
          } else {
            this.#isUpdatingLangAttr = false;
          }
          break;
        case 'locales-from':
          if (this.#localeList.length !== 0) {
            locales = this.#getLocalesByLocalesFromAttr();
          }
          break;
      }

      if (locales.length > 0) {
        this.locales =
            getSupportedLocales(locales, this.intlObj, this.optionLocaleMatcher)
            .join(' ');
      }
    });

    this.#attrObserver.observe(this, {
      attributes: true,
      attributeFilter: ['lang', 'locales-from'],
    });
  }

  #observeAncestor() {
    this.#ancestorObserver = new MutationObserver(entries => {
      if (this.#localeList.length !== 0) {
        return;
      }

      const target = entries[0]!.target as HTMLElement;

      if (target.contains(this) && target.matches('[lang], intl-locale')) {
        const supportedLocales = getSupportedLocales(
            this.#getLocalesByAncestor(), this.intlObj,
            this.optionLocaleMatcher);

        if (supportedLocales.length > 0) {
          this.locales = supportedLocales.join(' ');
        }
      }
    });

    this.#ancestorObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['lang'],
      childList: true,
      subtree: true,
    });
  }

  #updateLangAndDirAttrs() {
    const newLang = this.#localeList[0];

    if (!newLang) {
      return;
    }

    const oldLang = this.getAttribute('lang');
    if (oldLang !== newLang) {
      this.#isUpdatingLangAttr = true;
      this.setAttribute('lang', newLang);
    }

    try {
      const isRtl = (new Intl.Locale(newLang))
          .textInfo.direction === 'rtl';
      if (isRtl) {
        this.setAttribute('dir', 'rtl');
      } else {
        this.removeAttribute('dir');
      }
    } catch {
      // If `Intl.Locale`s `textInfo` is not supported, do nothing.
    }
  }
}
