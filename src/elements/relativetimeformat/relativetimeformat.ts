import {property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedRelativeTimeFormatOptions;

  #formattedParts: Intl.RelativeTimeFormatPart[] = [];

  protected intlObj = Intl.RelativeTimeFormat;

  @property({reflect: true, attribute: 'intl-style'})
  intlStyle: Intl.RelativeTimeFormatStyle = 'long';

  @property({reflect: true})
  numeric: Intl.RelativeTimeFormatNumeric = 'always';

  @property({reflect: true, type: Number})
  value!: number;

  @property({reflect: true})
  unit!: Intl.RelativeTimeFormatUnit;

  resolvedOptions(): Intl.ResolvedRelativeTimeFormatOptions {
    return this.#resolvedOptions;
  }

  formatToParts(): Intl.RelativeTimeFormatPart[] {
    return this.#formattedParts;
  }

  override render() {
    let result = '';

    if (this.unit && this.value) {
      try {
        const rtf = new Intl.RelativeTimeFormat(this.localeList, {
          numeric: this.numeric,
          style: this.intlStyle,
        });
        this.#resolvedOptions = rtf.resolvedOptions();
        this.#formattedParts = rtf.formatToParts(this.value, this.unit);
        result = rtf.format(this.value, this.unit);
      } catch {}
    }

    return result;
  }
}