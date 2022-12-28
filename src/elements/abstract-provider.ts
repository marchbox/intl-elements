import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';

import {default as LocaleList, IntlApiType} from '../utils/locale-list.js';
import {optionProperty} from '../utils/properties.js';
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

/** @internal */
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

  abstract get intlObject(): IntlObjectType;

  /** @readonly */
  @property({attribute: false})
  get localeList(): LocaleList {
    return this.#localeList;
  }

  @property({reflect: true})
  locales?: string;

  @property({attribute: 'locales-from'})
  localesFrom?: string;

  /** @readonly */
  get localesFromElements(): HTMLIntlLocaleElement[] {
    return this.#localesFromElements;
  }

  @optionProperty()
  optionLocaleMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  // TODO: Cache the list.
  /** @readonly */
  get consumerElements(): ConsumerElement[] {
    const names = (this.constructor as typeof AbstractProvider)
        .consumerElementNames;
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

  protected override willUpdate(changes: Map<string, unknown>) {
    if (changes.has('locales')) {
      this.#isUpdatingLocales = true;
      this.#localeList.value = this.locales ?? this.#getAdditionalLocales();
    }
  }

  protected override firstUpdated() {
    this.#observeForLocaleList();
  }

  override updated() {
    this.consumerElements.forEach(el => el.requestUpdate());
  }

  abstract resolvedOptions(): ResolvedOptionsReturnType;

  #getIntlApi(): IntlApiType {
    return (this.constructor as typeof AbstractProvider).intlApi;
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
        .map(id => document
            .querySelector(`intl-locale#${id}`) as HTMLIntlLocaleElement)
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
    const parents = new Set<ParentNode>();
    for (const el of this.localesFromElements) {
      if (el.parentNode) {
        parents.add(el.parentNode);
      }
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
      // If all the targets are the element itself or its descendants, ignore
      if (entries.every(entry => entry.target === this ||
          this.contains(entry.target as Node))) {
        return;
      }

      // If one of the targets is a relevant `<intl-locale>` element, wait for
      // it to update before updating the locale list
      await (entries.find(entry => entry.target === this.closest('intl-locale'))
          ?.target as HTMLIntlLocaleElement)?.updateComplete;

      this.#localeList.value = this.#getAdditionalLocales();
    });
    this.#ancestorObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    this.#ancestorObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }
}
