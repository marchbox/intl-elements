import {defineIntlDateTimeFormatElements} from './elements/datetimeformat';
import {defineIntlDisplayNamesElements} from './elements/displaynames';
import {defineIntlListFormatElements} from './elements/listformat';
import {defineIntlLocaleElements} from './elements/locale';
import {defineIntlNumberFormatElements} from './elements/numberformat';
import {defineIntlPluralRulesElements} from './elements/pluralrules';
import {defineIntlRelativeTimeFormatElements} from './elements/relativetimeformat';
import {defineIntlSegmenterElements} from './elements/segmenter';

export function defineIntlElements() {
  defineIntlDateTimeFormatElements();
  defineIntlDisplayNamesElements();
  defineIntlListFormatElements();
  defineIntlLocaleElements();
  defineIntlNumberFormatElements();
  defineIntlPluralRulesElements();
  defineIntlRelativeTimeFormatElements();
  defineIntlSegmenterElements();
}

export * from './elements/datetimeformat';
export * from './elements/displaynames';
export * from './elements/listformat';
export * from './elements/locale';
export * from './elements/numberformat';
export * from './elements/pluralrules';
export * from './elements/relativetimeformat';
export * from './elements/segmenter';
