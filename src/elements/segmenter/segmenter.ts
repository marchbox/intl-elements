import {property} from 'lit/decorators.js';

import {IntlObjType} from '../../utils/locale-list';
import AbstractIntlElement from '../abstract-intl-element';

export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedSegmenterOptions;

  #value?: Intl.Segments;

  get value(): Intl.Segments | undefined {
    return this.#value;
  }

  get valueAsDocumentFragment(): DocumentFragment | undefined {
    // TODO: Implement this.
    return document.createDocumentFragment();
  }

  get valueAsHTMLString(): string {
    // TODO: Implement this.
    return '';
  }

  @property({attribute: 'option-granularity'})
  optionGranularity: Intl.SegmenterGranularity = 'grapheme';

  protected override getIntlObj(): IntlObjType {
    return Intl.Segmenter;
  }

  resolvedOptions(): Intl.ResolvedSegmenterOptions {
    return this.#resolvedOptions;
  }

  override render() {
    const segmenter = new Intl.Segmenter(this.localeList.value, {
      granularity: this.optionGranularity,
      localeMatcher: this.optionLocaleMatcher,
    });

    this.#value = segmenter.segment(this.textContent?.trim() || '');
    this.#resolvedOptions = segmenter.resolvedOptions();

    // TODO: Implement this.
    return this.valueAsDocumentFragment;
  }
}