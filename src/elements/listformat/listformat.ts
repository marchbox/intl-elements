import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from '../abstract-provider';

export default class extends AbstractProvider {
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

  resolvedOptions(): Intl.ResolvedListFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.ListFormat(this.localeList.valueAsArray, {
        type: this.optionType,
        style: this.optionStyle,
        localeMatcher: this.optionLocaleMatcher,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
