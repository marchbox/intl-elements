import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';

import {default as LocaleList, IntlObjType} from '../utils/locale-list';
import HTMLIntlLocaleElement from './locale/locale';

const RELEVANT_ANCESTOR_QUERY = '[lang], intl-locale';

type ResolvedOptionsReturnType = Intl.ResolvedCollatorOptions |
    Intl.ResolvedDateTimeFormatOptions |
    Intl.ResolvedDisplayNamesOptions |
    Intl.ResolvedListFormatOptions |
    Intl.ResolvedNumberFormatOptions |
    Intl.ResolvedPluralRulesOptions |
    Intl.ResolvedRelativeTimeFormatOptions |
    Intl.ResolvedSegmenterOptions;

export default abstract class AbstractIntlElement extends LitElement {
  #attrObserver!: MutationObserver;
  #localesFromElementsObserver!: MutationObserver;
  #ancestorObserver!: MutationObserver;

  #previousLocaleList?: LocaleList;
  #localeList!: LocaleList;

  #isUpdatingLocales = false;

  #localesFromElements: HTMLIntlLocaleElement[] = [];

  @property({attribute: false})
  get localeList(): LocaleList {
    return this.#localeList;
  }

  @property({reflect: true})
  locales?: string;

  @property({attribute: 'locales-from'})
  localesFrom = '';

  get localesFromElements(): HTMLIntlLocaleElement[] {
    return this.#localesFromElements;
  }

  @property({attribute: 'option-localematcher'})
  optionLocaleMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  constructor() {
    super();

    this.#localeList = new LocaleList(this.getIntlObj(), '');
    this.#localeList.onChange(this.#handleLocaleListChange.bind(this));
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

    if (this.#localeList.length === 0) {
      this.#localeList.value = this.#getAdditionalLocales();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.#attrObserver) {
      this.#attrObserver.disconnect();
    }

    if (this.#localesFromElementsObserver) {
      this.#localesFromElementsObserver.disconnect();
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
      this.#isUpdatingLocales = true;
      this.#localeList.value = this.locales ?? this.#getAdditionalLocales();
    }
  }

  protected override firstUpdated() {
    this.#observeForLocaleList();
  }

  abstract resolvedOptions(): ResolvedOptionsReturnType;

  protected abstract getIntlObj(): IntlObjType;

  #handleLocaleListChange() {
    if (!this.#isUpdatingLocales) {
      if (this.hasAttribute('locales')) {
        this.locales = this.#localeList.value;
      }
    } else {
      this.#isUpdatingLocales = false;
    }
    this.requestUpdate('localeList', this.#previousLocaleList);
    this.#previousLocaleList =
        new LocaleList(this.getIntlObj(), this.#localeList.value);
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
  #getAdditionalLocales(): string {
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

    this.#localesFromElements = this.localesFrom.split(' ')
        .map(id => {
          return document
              .querySelector(`intl-locale#${id}`) as HTMLIntlLocaleElement;
        })
        .filter(Boolean)
        .filter(el => el.valueAsString !== '');

    return this.#localesFromElements
        .map(el => el.valueAsString).join(' ');
  }

  #getLocalesFromAncestor(): string {
    const el = this.closest(RELEVANT_ANCESTOR_QUERY) as HTMLElement;
    if (!el) {
      return '';
    }

    if (el.tagName === 'INTL-LOCALE') {
      return (el as HTMLIntlLocaleElement).valueAsString;
    } else {
      return el.getAttribute('lang')!;
    }
  }

  #observeForLocaleList() {
    this.#observeAttrs();
    this.#observeLocalesFromElements();
    this.#observeAncestor();
  }

  #observeAttrs() {
    this.#attrObserver = new MutationObserver(() => {
      this.#localeList.value = this.#getAdditionalLocales();
    });
    this.#attrObserver.observe(this, {
      attributes: true,
      attributeFilter: ['lang', 'locales-from'],
    });
  }

  #observeLocalesFromElements() {
    this.#localesFromElementsObserver = new MutationObserver(() => {
      this.#localeList.value = this.#getAdditionalLocales();
    });

    // Observing parent nodes because the `<intl-locale>` elements can be
    // removed from the DOM.
    const parents: ParentNode[] = [];
    for (const el of this.#localesFromElements) {
      if (!el.parentNode || parents.includes(el.parentNode)) {
        continue;
      }

      parents.push(el.parentNode);
      this.#localesFromElementsObserver.observe(el.parentNode, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  }

  #observeAncestor() {
    this.#ancestorObserver = new MutationObserver(async (entries) => {
      const relevantAncestor = entries.find(entry => {
        return entry.target !== this &&
            entry.target === this.closest(RELEVANT_ANCESTOR_QUERY);
      })?.target as HTMLElement | undefined;

      if (!relevantAncestor) {
        return;
      }

      if (relevantAncestor.tagName === 'INTL-LOCALE') {
        await (relevantAncestor as HTMLIntlLocaleElement).updateComplete;
      }

      this.#localeList.value = this.#getAdditionalLocales();
    });
    this.#ancestorObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
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
