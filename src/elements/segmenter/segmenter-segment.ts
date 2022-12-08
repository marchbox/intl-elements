import {TemplateResult, html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';
import {when} from 'lit/directives/when.js';

import AbstractConsumer from '../abstract-consumer';
import HTMLIntlSegmenterElement from './segmenter';

export default class extends AbstractConsumer<HTMLIntlSegmenterElement, Intl.Segments | undefined> {
  protected static override observesText = true;

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
    let segmentHtml: TemplateResult | string = '';

    if (this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.segment(this.input);
        isGranularityWord =
            this.providerElement.resolvedOptions().granularity === 'word';
        segmentHtml = html`
          ${map(Array.from(this.#value), segment =>
            when(isGranularityWord && !segment.isWordLike,
              () => segment.segment,
              () => html`<span part=${this.#getParts(segment)}
                  role="none">${segment.segment}</span>`))}
        `;
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${segmentHtml}</span>
      <span aria-hidden="true" hidden>
        <slot></slot>
        <slot name="word-like"></slot>
        <slot name="non-word-like"></slot>
      </span>
    `;
  }
}
