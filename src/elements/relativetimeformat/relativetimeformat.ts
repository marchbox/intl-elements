import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlProviderElement from '../abstract-intl-provider-element';

export default class extends AbstractIntlProviderElement {
  protected static override consumerElementNames = new Set([
    'intl-relativetimeformat-format',
    'intl-relativetimeformat-formattoparts',
  ]);

  protected static override intlApi = Intl.RelativeTimeFormat;

  #resolvedOptions!: Intl.ResolvedRelativeTimeFormatOptions;

  #intlObject!: Intl.RelativeTimeFormat;

  get intlObject(): Intl.RelativeTimeFormat {
    return this.#intlObject;
  }

  @property({attribute: 'option-style'})
  optionStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute:'option-numeric'})
  optionNumeric: Intl.RelativeTimeFormatNumeric = 'always';

  resolvedOptions(): Intl.ResolvedRelativeTimeFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.RelativeTimeFormat(this.localeList.value, {
        numeric: this.optionNumeric,
        style: this.optionStyle,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
