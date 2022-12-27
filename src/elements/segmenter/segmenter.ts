import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @intl `Intl.Segmenter`
 * @mdn http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter
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