import {default as HTMLIntlDisplayNamesElement} from './elements/displaynames/displaynames';
import {default as HTMLIntlListFormatElement} from './elements/listformat/listformat';
import {default as HTMLIntlListItemElement} from './elements/listitem/listitem';
import {default as HTMLIntlRelativeTimeFormatElement} from './elements/relativetimeformat/relativetimeformat';

declare global {
  interface HTMLElementTagNameMap {
    'intl-displaynames': HTMLIntlDisplayNamesElement;
    'intl-listformat': HTMLIntlListFormatElement;
    'intl-listitem': HTMLIntlListItemElement;
    'intl-relativetimeformat': HTMLIntlRelativeTimeFormatElement;
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

export function defineIntlRelativeTimeFormatElement() {
  customElements.define('intl-relativetimeformat', HTMLIntlRelativeTimeFormatElement);
}

export function defineIntlElements() {
  defineIntlListItemElement();
  defineIntlDisplayNamesElement();
  defineIntlListFormatElement();
  defineIntlRelativeTimeFormatElement();
}

export {
  HTMLIntlDisplayNamesElement,
  HTMLIntlListFormatElement,
  HTMLIntlListItemElement,
  HTMLIntlRelativeTimeFormatElement,
}
