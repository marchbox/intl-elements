import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';

import {localesToLocaleList} from '../utils/locales';

export default abstract class AbstractIntlElement extends LitElement {
  @property({attribute: false})
  localeList: Intl.BCP47LanguageTag[] = [];

  @property({reflect: true})
  locales: Intl.LocalesArgument = '';

  @property({attribute: 'locale-matcher', reflect: true})
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher = 'best fit';

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
