import {default as HTMLIntlLocaleElement} from './elements/locale/locale';
import {default as HTMLIntlDisplayNamesElement} from './elements/displaynames/displaynames';
import {default as HTMLIntlDisplayNamesOfElement} from './elements/displaynames/displaynames-of';
import {default as HTMLIntlListFormatElement} from './elements/listformat/listformat';
import {default as HTMLIntlListItemElement} from './elements/listitem/listitem';
import {default as HTMLIntlRelativeTimeFormatElement} from './elements/relativetimeformat/relativetimeformat';

declare global {
  interface HTMLElementTagNameMap {
    'intl-locale': HTMLIntlLocaleElement;
    'intl-displaynames': HTMLIntlDisplayNamesElement;
    'intl-displaynames-of': HTMLIntlDisplayNamesOfElement;
    'intl-listformat': HTMLIntlListFormatElement;
    'intl-listitem': HTMLIntlListItemElement;
    'intl-relativetimeformat': HTMLIntlRelativeTimeFormatElement;
  }
}

export function defineIntlLocaleElement() {
  customElements.define('intl-locale', HTMLIntlLocaleElement);
}

export function defineIntlDisplayNamesElement() {
  customElements.define('intl-displaynames', HTMLIntlDisplayNamesElement);
}

export function defineIntlDisplayNamesOfElement() {
  customElements.define('intl-displaynames-of', HTMLIntlDisplayNamesOfElement);
}

export function defineIntlListFormatElement() {
  customElements.define('intl-listformat', HTMLIntlListFormatElement);
}

export function defineIntlListItemElement() {
  customElements.define('intl-listitem', HTMLIntlListItemElement);
}

export function defineIntlRelativeTimeFormatElement() {
  customElements.define('intl-relativetimeformat', HTMLIntlRelativeTimeFormatElement);
}

export function defineIntlElements() {
  defineIntlLocaleElement();
  defineIntlListItemElement();
  defineIntlDisplayNamesElement();
  defineIntlDisplayNamesOfElement();
  defineIntlListFormatElement();
  defineIntlRelativeTimeFormatElement();
}

export {
  HTMLIntlLocaleElement,
  HTMLIntlDisplayNamesElement,
  HTMLIntlDisplayNamesOfElement,
  HTMLIntlListFormatElement,
  HTMLIntlListItemElement,
  HTMLIntlRelativeTimeFormatElement,
}
