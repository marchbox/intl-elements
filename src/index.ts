import {default as HTMLIntlDisplayNamesElement} from './elements/displaynames/displaynames';
import {default as HTMLIntlListFormatElement} from './elements/listformat/listformat';
import {default as HTMLIntlListItemElement} from './elements/listitem/listitem';

declare global {
  interface HTMLElementTagNameMap {
    'intl-displaynames': HTMLIntlDisplayNamesElement;
    'intl-listformat': HTMLIntlListFormatElement;
    'intl-listitem': HTMLIntlListItemElement;
  }
}

export function defineIntlDisplayNamesElement() {
  customElements.define('intl-displaynames', HTMLIntlDisplayNamesElement);
}

export function defineIntlListFormatElement() {
  customElements.define('intl-listformat', HTMLIntlListFormatElement);
}

export function defineIntlListItemElement() {
  customElements.define('intl-listitem', HTMLIntlListItemElement);
}

export function defineIntlElements() {
  defineIntlListItemElement();
  defineIntlDisplayNamesElement();
  defineIntlListFormatElement();
}

export {
  HTMLIntlDisplayNamesElement,
  HTMLIntlListFormatElement,
  HTMLIntlListItemElement,
}
