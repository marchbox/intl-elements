import {defineIntlCollatorElements} from './elements/collator/index.js';
import {defineIntlDateTimeFormatElements} from './elements/datetimeformat/index.js';
import {defineIntlDisplayNamesElements} from './elements/displaynames/index.js';
import {defineIntlListFormatElements} from './elements/listformat/index.js';
import {defineIntlLocaleElements} from './elements/locale/index.js';
import {defineIntlNumberFormatElements} from './elements/numberformat/index.js';
import {defineIntlPluralRulesElements} from './elements/pluralrules/index.js';
import {defineIntlRelativeTimeFormatElements} from './elements/relativetimeformat/index.js';
import {defineIntlSegmenterElements} from './elements/segmenter/index.js';

export * from './elements/collator/index.js';
export * from './elements/datetimeformat/index.js';
export * from './elements/displaynames/index.js';
export * from './elements/listformat/index.js';
export * from './elements/locale/index.js';
export * from './elements/numberformat/index.js';
export * from './elements/pluralrules/index.js';
export * from './elements/relativetimeformat/index.js';
export * from './elements/segmenter/index.js';

export function defineIntlElements() {
  defineIntlCollatorElements();
  defineIntlDateTimeFormatElements();
  defineIntlDisplayNamesElements();
  defineIntlListFormatElements();
  defineIntlLocaleElements();
  defineIntlNumberFormatElements();
  defineIntlPluralRulesElements();
  defineIntlRelativeTimeFormatElements();
  defineIntlSegmenterElements();
}
