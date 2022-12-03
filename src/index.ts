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

export function defineIntlElements() {
  defineIntlLocaleElements();
  defineIntlDisplayNamesElements();
  defineIntlListFormatElements();
  defineIntlRelativeTimeFormatElements();
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
}
