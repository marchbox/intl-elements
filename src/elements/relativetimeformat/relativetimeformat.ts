import {property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedRelativeTimeFormatOptions;

  #formattedParts: Intl.RelativeTimeFormatPart[] = [];

  #value = '';

  protected intlObj = Intl.RelativeTimeFormat;

  @property({attribute: 'option-style', reflect: true})
  optionStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({attribute:'option-numeric', reflect: true})
  optionNumeric: Intl.RelativeTimeFormatNumeric = 'always';

  @property({attribute: 'format-value', reflect: true, type: Number})
  formatValue!: number;

  @property({attribute: 'format-unit', reflect: true})
  formatUnit!: Intl.RelativeTimeFormatUnit;

  get value(): string {
    return this.#value;
  }

  get formattedParts(): Intl.RelativeTimeFormatPart[] {
    return this.#formattedParts;
  }

  resolvedOptions(): Intl.ResolvedRelativeTimeFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    if (this.formatUnit && this.formatValue) {
      try {
        const rtf = new Intl.RelativeTimeFormat(this.localeList, {
          numeric: this.optionNumeric,
          style: this.optionStyle,
        });
        this.#resolvedOptions = rtf.resolvedOptions();
        this.#formattedParts =
            rtf.formatToParts(this.formatValue, this.formatUnit);
        this.#value = rtf.format(this.formatValue, this.formatUnit);
      } catch {}
    }

    return this.#value;
  }
}
