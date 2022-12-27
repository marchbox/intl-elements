import {TemplateResult, html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';
import {when} from 'lit/directives/when.js';

import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlSegmenterElement from './segmenter.js';

type ValueType = Intl.Segments | undefined;

/**
 * @intl Intl.Segmenter.prototype.segment
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment
 *
 * @element intl-segmenter-segment
 *
 * @slot - The slot should only contain plain text, its `textContent` is used as
 *     the `input` argument of `Intl.Segmenter`’s `segment()`. Any HTML elements
 *     in the slot are ignored.
 *
 * @csspart value - The `<span>` element that contains the segmented HTML
 *     result.
 * @csspart segment - The `<span>` element that contains the text of a segment.
 *     Not that if the provider element’s `option-granularity` is `word`, for
 *     a none-word-like segment, the text is not wrapped in a `<span>` element.
 *     This is to avoid characters like punctuation marks being inappropriately
 *     wrapped to the next line, e.g. a comma at the beginning of a line, or a
 *     opening quotation mark at the end of a line.
 * @csspart wordlike - The `<span>` element that contains the text of a segment
 *     which `isWordLike` is `true`.
 */
export default class HTMLIntlSegmenterSegmentElement
    extends AbstractConsumer<HTMLIntlSegmenterElement, ValueType> {
  protected static override observesText = true;

  protected static override providerElementName = 'intl-segmenter';

  #value: ValueType;

  /** @readonly */
  get value(): ValueType {
    return this.#value;
  }

  /**
   * A read only reference to the `input` argument of `Intl.Segmenter`’s
   * `segment()`.
   * @readonly
   */
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
      </span>
    `;
  }
}
