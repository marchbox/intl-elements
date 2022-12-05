import {
  HTMLIntlLocaleElement,
  defineIntlLocaleElements,
} from './elements/locale';
import {
  HTMLIntlDisplayNamesElement,
  HTMLIntlDisplayNamesOfElement,
  defineIntlDisplayNamesElements,
} from './elements/displaynames';
import {
  HTMLIntlListFormatElement,
  HTMLIntlListFormatFormatElement,
  defineIntlListFormatElements,
} from './elements/listformat';
import {
  HTMLIntlRelativeTimeFormatElement,
  HTMLIntlRelativeTimeFormatFormatElement,
  HTMLIntlRelativeTimeFormatFormatToPartsElement,
  defineIntlRelativeTimeFormatElements,
} from './elements/relativetimeformat';
import {
  HTMLIntlSegmenterElement,
  HTMLIntlSegmenterSegmentElement,
  defineIntlSegmenterElements,
} from './elements/segmenter';

export function defineIntlElements() {
  defineIntlLocaleElements();
  defineIntlDisplayNamesElements();
  defineIntlListFormatElements();
  defineIntlRelativeTimeFormatElements();
  defineIntlSegmenterElements();
}

export {
  HTMLIntlLocaleElement,
  HTMLIntlDisplayNamesElement,
  HTMLIntlDisplayNamesOfElement,
  HTMLIntlListFormatElement,
  HTMLIntlListFormatFormatElement,
  HTMLIntlRelativeTimeFormatElement,
  HTMLIntlRelativeTimeFormatFormatElement,
  HTMLIntlRelativeTimeFormatFormatToPartsElement,
  HTMLIntlSegmenterElement,
  HTMLIntlSegmenterSegmentElement,
}
