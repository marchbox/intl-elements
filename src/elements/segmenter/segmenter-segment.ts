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
              () => html`<span
                  part=${this.#getParts(segment)}>${segment.segment}</span>`))}
        `;
      } catch {}
    }

    // Use a `<span>` element to host text for screen readers instead of
    // `aria-label` attribute so the text reads better, especially for
    // multiingual text.
    return html`
      <span class="sr"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${this.input}</span>
      <span part="value" aria-hidden="true"
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
