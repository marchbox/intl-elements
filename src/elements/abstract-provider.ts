import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';

import {default as LocaleList, IntlApiType} from '../utils/locale-list.js';
import {SPECIAL_OPTION_KEYS, getCanonicalOptionValue} from '../utils/properties.js';
import AbstractConsumer from './abstract-consumer.js';
import HTMLIntlLocaleElement from './locale/locale.js';

export type IntlObjectType = Intl.Collator |
    Intl.DateTimeFormat |
    Intl.DisplayNames |
    Intl.ListFormat |
    Intl.NumberFormat |
    Intl.PluralRules |
    Intl.RelativeTimeFormat |
    Intl.Segmenter;

const RELEVANT_ANCESTOR_QUERY = '[lang], intl-locale';

type ResolvedOptionsReturnType = Intl.ResolvedCollatorOptions |
    Intl.ResolvedDateTimeFormatOptions |
    Intl.ResolvedDisplayNamesOptions |
    Intl.ResolvedListFormatOptions |
    Intl.ResolvedNumberFormatOptions |
    Intl.ResolvedPluralRulesOptions |
    Intl.ResolvedRelativeTimeFormatOptions |
    Intl.ResolvedSegmenterOptions;

type ConsumerElement = AbstractConsumer<AbstractProvider, any>;

export default abstract class AbstractProvider extends LitElement {
  #attrObserver!: MutationObserver;
  #localesFromElementsObserver!: MutationObserver;
  #ancestorObserver!: MutationObserver;

  #previousLocaleList?: LocaleList;
  #localeList!: LocaleList;

  #isUpdatingLocales = false;

  #localesFromElements: HTMLIntlLocaleElement[] = [];

  protected static consumerElementNames: Set<string>;

  protected static intlApi: IntlApiType;

  abstract intlObject: IntlObjectType;

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

  // TODO: Cache the list.
  get consumerElements(): ConsumerElement[] {
    // @ts-ignore
    const names = this.constructor.consumerElementNames;
    if (!names) {
      return [];
    }

    const descendantQuery = Array.from(names.values()).join(',');
    const descendantConsumers = Array.from(this
        .querySelectorAll(descendantQuery) as NodeListOf<ConsumerElement>);
    let cousinConsumers: ConsumerElement[] = [];

    if (this.id) {
      const cousinQuery = Array.from(names.values())
          .map(name => `${name}[provider="${this.id}"]`).join(',');
      cousinConsumers = Array.from(document
          .querySelectorAll(cousinQuery) as NodeListOf<ConsumerElement>);
    }

    return [...descendantConsumers, ...cousinConsumers];
  }

  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.#localeList = new LocaleList(this.#getIntlApi(), '');
    this.#localeList.onChange(this.#handleLocaleListChange.bind(this));

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'none');
    }

    this.#localeList.value = this.#getAdditionalLocales();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.#attrObserver.disconnect();
    this.#localesFromElementsObserver.disconnect();
    this.#ancestorObserver.disconnect();
  }

  protected override shouldUpdate(changes: Map<string, unknown>): boolean {
    // Makes sure the canonical new value is not the same as the old value.
    // TODO(#42): Creates a custom decorator that extends lit’s `@property`
    // decorator and custom the `converter()` and `hasChanged()` functions with
    // canonical value conversion and evaluation.
    return Array.from(changes.entries())
        .every(([key, oldValue]) => {
          // @ts-ignore
          const canonicalValue = getCanonicalOptionValue(key, this[key]);
          return canonicalValue !== oldValue;
        });
  }

  protected override willUpdate(changes: Map<string, unknown>) {
    if (changes.has('locales')) {
      this.#isUpdatingLocales = true;
      this.#localeList.value = this.locales ?? this.#getAdditionalLocales();
    }

    // Canonicalizes the new values.
    // TODO(#42): After creating a custom property decorator, this can be removed.
    Array.from(changes.keys())
      .filter(key => SPECIAL_OPTION_KEYS.includes(key))
      .forEach(key => {
        // @ts-ignore
        this[key] = getCanonicalOptionValue(key, this[key]);
      });
  }

  protected override firstUpdated() {
    this.#observeForLocaleList();
  }

  override updated() {
    this.consumerElements.forEach(el => el.requestUpdate());
  }

  abstract resolvedOptions(): ResolvedOptionsReturnType;

  #getIntlApi(): IntlApiType {
    // @ts-ignore
    return this.constructor.intlApi;
  }

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
        new LocaleList(this.#getIntlApi(), this.#localeList.value);
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
    const funcs = [
      this.#getLocalesFromLocalesAttr,
      this.#getLocalesFromLangAttr,
      this.#getLocalesFromLocalesFromAttr,
      this.#getLocalesFromAncestor,
    ];

    for (const func of funcs) {
      const locales = new LocaleList(this.#getIntlApi(), func.call(this)).value;
      if (locales) {
        return locales;
      }
    }

    return '';
  }

  #getLocalesFromLocalesAttr(): string {
    return this.locales ?? '';
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

    if (el.matches('intl-locale')) {
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
    const parents: Set<ParentNode> = new Set();
    for (const el of this.localesFromElements) {
      if (!el.parentNode) {
        continue;
      }
      parents.add(el.parentNode);
    }
    parents.forEach(parent => {
      this.#localesFromElementsObserver.observe(parent, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });
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
}
