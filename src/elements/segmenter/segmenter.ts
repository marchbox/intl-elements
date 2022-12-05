import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlProviderElement from '../abstract-intl-provider-element';

export default class extends AbstractIntlProviderElement {
  protected static override intlApi = Intl.Segmenter;

  protected static override consumerElementNames = new Set([
    'intl-segmenter-segment',
  ]);

  #intlObject!: Intl.Segmenter;

  #resolvedOptions!: Intl.ResolvedSegmenterOptions;

  @property({attribute: 'option-granularity'})
  optionGranularity: Intl.SegmenterGranularity = 'grapheme';

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