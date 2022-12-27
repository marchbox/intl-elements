import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @intl Intl.Segmenter
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter
 * @intlprovider
 *
 * @element intl-segmenter
 */
export default class HTMLIntlSegmenterElement extends AbstractProvider {
  protected static override intlApi = Intl.Segmenter;

  protected static override consumerElementNames = new Set([
    'intl-segmenter-segment',
  ]);

  #intlObject!: Intl.Segmenter;

  #resolvedOptions!: Intl.ResolvedSegmenterOptions;

  @optionProperty()
  optionGranularity: Intl.SegmenterOptions['granularity'] = 'grapheme';

  /** @readonly */
  get intlObject(): Intl.Segmenter {
    return this.#intlObject;
  }

  /**
   * @intl Intl.Segmenter.prototype.resolvedOptions
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedSegmenterOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.Segmenter(this.localeList.valueAsArray, {
        granularity: this.optionGranularity,
        localeMatcher: this.optionLocaleMatcher,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}