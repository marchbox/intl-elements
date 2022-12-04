import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlProviderElement from '../abstract-intl-provider-element';

export default class extends AbstractIntlProviderElement {
  protected static override consumerElementNames = new Set([
    'intl-listformat-format',
    'intl-listformat-formattoparts',
  ]);

  protected static override intlApi = Intl.ListFormat;

  #resolvedOptions!: Intl.ResolvedListFormatOptions;

  #intlObject!: Intl.ListFormat;

  get intlObject(): Intl.ListFormat {
    return this.#intlObject;
  }

  @property({attribute: 'option-style'})
  optionStyle: Intl.ListFormatStyle = 'long';
  
  @property({attribute: 'option-type'})
  optionType: Intl.ListFormatType = 'conjunction';

  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
  }

  resolvedOptions(): Intl.ResolvedListFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.ListFormat(this.localeList.value, {
        type: this.optionType,
        style: this.optionStyle,
        localeMatcher: this.optionLocaleMatcher,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
