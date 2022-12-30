import {ContentPart, generateContent} from '../../utils/templates.js';
import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlSegmenterElement from './segmenter.js';

type ValueType = Intl.Segments | undefined;

/**
 * @intl Intl.Segmenter.prototype.segment
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment
 * @intlconsumer
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
 *     a non-word-like segment, the text is not wrapped in a `<span>` element.
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

  override render() {
    let isGranularityWord = false;
    let partsContent: ContentPart[] = [];

    if (this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.segment(this.input);
        isGranularityWord =
            this.providerElement.resolvedOptions().granularity === 'word';
      } catch {}
    }

    if (this.#value) {
      partsContent = Array.from(this.#value).map(segment => ({
        value: segment.segment,
        type: segment.isWordLike ? 'wordlike' : undefined,
        source: 'segment',
        unwrap: isGranularityWord && !segment.isWordLike,
      }))
    }

    return generateContent({
      stringContent: this.input,
      partsContent,
      lang: this.currentLang,
      dir: this.currentDir,
      slots: [''],
    });
  }
}
