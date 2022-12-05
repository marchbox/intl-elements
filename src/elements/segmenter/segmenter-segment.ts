import {html} from 'lit';

import AbstractIntlConsumerElement from '../abstract-intl-consumer-element';
import HTMLIntlSegmenterElement from './segmenter';

export default class extends AbstractIntlConsumerElement<HTMLIntlSegmenterElement, Intl.Segments | undefined> {
  protected static override allowTextContent = true;

  protected static override providerElementName = 'intl-segmenter';

  #value?: Intl.Segments;

  get value(): Intl.Segments | undefined {
    return this.#value;
  }

  get input(): string {
    return this.textContent!.trim() || '';
  }

  #getParts(segment: Intl.SegmentData): string {
    const parts = ['segment'];

    if (segment.isWordLike) {
      parts.push('wordlike');
    }

    return parts.join(' ');
  }

  override render() {
    let isGranularityWord = false;

    if (this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.segment(this.input);
        isGranularityWord =
            this.providerElement.resolvedOptions().granularity === 'word';
      } catch {}
    }

    return html`
      <span role="none" part="value">${Array.from(this.#value ?? []).map(segment =>
        isGranularityWord && !segment.isWordLike ? segment.segment :
          html`<span part=${this.#getParts(segment)} role="none">${segment.segment}</span>`
      )}</span>
      <span aria-hidden="true" hidden>
        <slot></slot>
        <slot name="word-like"></slot>
        <slot name="non-word-like"></slot>
      </span>
    `;
  }
}
