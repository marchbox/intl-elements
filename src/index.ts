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
  HTMLIntlNumberFormatElement,
  HTMLIntlNumberFormatFormatElement,
  HTMLIntlNumberFormatFormatToPartsElement,
  HTMLIntlNumberFormatFormatRangeElement,
  HTMLIntlNumberFormatFormatRangeToPartsElement,
  defineIntlNumberFormatElements,
} from './elements/numberformat';
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
  defineIntlNumberFormatElements();
  defineIntlRelativeTimeFormatElements();
  defineIntlSegmenterElements();
}

export {
  HTMLIntlLocaleElement,
  HTMLIntlDisplayNamesElement,
  HTMLIntlDisplayNamesOfElement,
  HTMLIntlListFormatElement,
  HTMLIntlListFormatFormatElement,
  HTMLIntlNumberFormatElement,
  HTMLIntlNumberFormatFormatElement,
  HTMLIntlNumberFormatFormatToPartsElement,
  HTMLIntlNumberFormatFormatRangeElement,
  HTMLIntlNumberFormatFormatRangeToPartsElement,
  HTMLIntlRelativeTimeFormatElement,
  HTMLIntlRelativeTimeFormatFormatElement,
  HTMLIntlRelativeTimeFormatFormatToPartsElement,
  HTMLIntlSegmenterElement,
  HTMLIntlSegmenterSegmentElement,
}
