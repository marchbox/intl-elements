import {defineIntlLocaleElements} from './elements/locale';
import {defineIntlDisplayNamesElements} from './elements/displaynames';
import {defineIntlListFormatElements} from './elements/listformat';
import {defineIntlNumberFormatElements} from './elements/numberformat';
import {defineIntlRelativeTimeFormatElements} from './elements/relativetimeformat';
import {defineIntlSegmenterElements} from './elements/segmenter';

export function defineIntlElements() {
  defineIntlLocaleElements();
  defineIntlDisplayNamesElements();
  defineIntlListFormatElements();
  defineIntlNumberFormatElements();
  defineIntlRelativeTimeFormatElements();
  defineIntlSegmenterElements();
}

export * from './elements/locale';
export * from './elements/displaynames';
export * from './elements/listformat';
export * from './elements/numberformat';
export * from './elements/relativetimeformat';
export * from './elements/segmenter';
