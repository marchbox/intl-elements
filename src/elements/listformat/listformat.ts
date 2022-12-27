import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @intl `Intl.ListFormat`
 * @mdn http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
 *
 * @element intl-listformat
 */
export default class HTMLIntlListFormatElement extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-listformat-format',
    'intl-listformat-formattoparts',
  ]);

  protected static override intlApi = Intl.ListFormat;

  #resolvedOptions!: Intl.ResolvedListFormatOptions;

  #intlObject!: Intl.ListFormat;

  /** @readonly */
  get intlObject(): Intl.ListFormat {
    return this.#intlObject;
  }

  @optionProperty()
  optionStyle: Intl.ListFormatOptions['style'] = 'long';
  
  @optionProperty()
  optionType: Intl.ListFormatOptions['type'] = 'conjunction';

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
