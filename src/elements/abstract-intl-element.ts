import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';

import {localesToLocaleList} from '../utils/locales';

// TODO: Remove when this bug is fixed:
// https://github.com/microsoft/TypeScript/issues/51023
interface IntlResolvedListFormatOptions {
  locale: Intl.BCP47LanguageTag;
  style: Intl.ListFormatStyle;
  type: Intl.ListFormatType;
}

type ResolvedOptionsReturnType = Intl.ResolvedCollatorOptions |
    Intl.ResolvedDateTimeFormatOptions |
    Intl.ResolvedDisplayNamesOptions |
    IntlResolvedListFormatOptions |
    Intl.ResolvedNumberFormatOptions |
    Intl.ResolvedPluralRulesOptions |
    Intl.ResolvedRelativeTimeFormatOptions |
    Intl.ResolvedSegmenterOptions;


export default abstract class AbstractIntlElement extends LitElement {
  @property({attribute: false})
  localeList: Intl.BCP47LanguageTag[] = [];

  @property({reflect: true})
  locales: Intl.LocalesArgument = '';

  @property({attribute: 'locale-matcher', reflect: true})
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

  abstract resolvedOptions(): ResolvedOptionsReturnType;

  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }

  protected override willUpdate(changes: PropertyValues<this>) {
    if (changes.has('locales')) {
      this.localeList =
          localesToLocaleList(this.locales as string, this.localeMatcher);
    }
  }
}
