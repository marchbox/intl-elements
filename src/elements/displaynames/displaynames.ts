import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @intl Intl.DisplayNames
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames
 * @intlprovider
 *
 * @element intl-displaynames
 */
export default class HTMLIntlDisplayNamesElement extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-displaynames-of',
  ]);

  protected static override intlApi = Intl.DisplayNames;

  #resolvedOptions!: Intl.ResolvedDisplayNamesOptions;

  #intlObject!: Intl.DisplayNames;

  /** @readonly */
  get intlObject(): Intl.DisplayNames {
    return this.#intlObject;
  }

  @optionProperty()
  optionType: Intl.DisplayNamesOptions['type'] = 'language';

  @optionProperty()
  optionStyle: Intl.DisplayNamesOptions['style'] = 'long';

  @optionProperty()
  optionLanguageDisplay: Intl.DisplayNamesOptions['languageDisplay'] = 'dialect';

  @optionProperty()
  optionFallback: Intl.DisplayNamesOptions['fallback'] = 'code';

  /**
   * @intl Intl.DisplayNames.prototype.resolvedOptions
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedDisplayNamesOptions {
    return this.#resolvedOptions;
  }

  protected override render() {
    try {
      this.#intlObject = new Intl.DisplayNames(this.localeList.valueAsArray, {
        type: this.optionType,
        style: this.optionStyle,
        localeMatcher: this.optionLocaleMatcher,
        languageDisplay: this.optionLanguageDisplay,
        fallback: this.optionFallback,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
