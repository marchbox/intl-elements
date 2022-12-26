import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

export default class HTMLIntlRelativeTimeFormatElement
    extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-relativetimeformat-format',
    'intl-relativetimeformat-formattoparts',
  ]);

  protected static override intlApi = Intl.RelativeTimeFormat;

  #resolvedOptions!: Intl.ResolvedRelativeTimeFormatOptions;

  #intlObject!: Intl.RelativeTimeFormat;

  /** @readonly */
  get intlObject(): Intl.RelativeTimeFormat {
    return this.#intlObject;
  }

  @optionProperty()
  optionStyle: Intl.RelativeTimeFormatOptions['style'] = 'long';

  @optionProperty()
  optionNumeric: Intl.RelativeTimeFormatOptions['numeric'] = 'always';

  resolvedOptions(): Intl.ResolvedRelativeTimeFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.RelativeTimeFormat(
        this.localeList.valueAsArray,
        {
          localeMatcher: this.optionLocaleMatcher,
          numeric: this.optionNumeric,
          style: this.optionStyle,
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
