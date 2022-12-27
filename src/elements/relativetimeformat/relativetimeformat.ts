import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @intl Intl.RelativeTimeFormat
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat
 *
 * @element intl-relativetimeformat
 */
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

  /**
   * @intl Intl.RelativeTimeFormat.prototype.resolvedOptions
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions
   */
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
