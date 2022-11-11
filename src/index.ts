import IntlDisplayNames from './elements/displaynames/displaynames';

export {
  IntlDisplayNames,
};

export function defaultCustomElementsIntlDisplayNames() {
  customElements.define('intl-displaynames', IntlDisplayNames);
}

export function defaultCustomElements() {
  defaultCustomElementsIntlDisplayNames();
}