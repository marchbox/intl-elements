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

export default abstract class AbstractIntlElement extends LitElement {
  protected abstract intlObj: any;

  #localeList: Intl.BCP47LanguageTag[] = [];

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

    if (!this.hasAttribute('locales') && this.hasAttribute('lang')) {
      this.locales = this.getAttribute('lang')!;
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
    } catch {
      this.#localeList = [];
    }
  }
}
