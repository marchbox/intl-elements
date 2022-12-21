import HTMLIntlSegmenterElement from './segmenter.js';
import HTMLIntlSegmenterSegmentElement from './segmenter-segment.js';

declare global {
  interface HTMLElementTagNameMap {
    'intl-segmenter': HTMLIntlSegmenterElement;
    'intl-segmenter-segment': HTMLIntlSegmenterSegmentElement;
  }
}

export function defineIntlSegmenterElements() {
  customElements.define('intl-segmenter', HTMLIntlSegmenterElement);
  customElements.define('intl-segmenter-segment', HTMLIntlSegmenterSegmentElement);
}

export {
  HTMLIntlSegmenterElement,
  HTMLIntlSegmenterSegmentElement,
}
